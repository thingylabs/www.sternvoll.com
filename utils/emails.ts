// utils/emails.ts
import { formatCurrency } from '@/utils/data.ts'
import { Money } from '@/utils/types.ts'
import { meta } from '@/config/meta.ts'

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

const bankDetails = meta.sepa

class MailgunError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MailgunError'
  }
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')
  const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN')

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    throw new MailgunError('Missing required Mailgun configuration')
  }

  // Construct the from address using the verified domain
  const from = `Pixelpilot Notifications <notifications@${MAILGUN_DOMAIN}>`

  const formData = new FormData()
  formData.append('from', from)
  formData.append('to', to)
  formData.append('subject', subject)

  if (text) formData.append('text', text)
  if (html) formData.append('html', html)

  try {
    // Convert API key to base64 properly
    const auth = btoa(`api:${MAILGUN_API_KEY}`)

    const response = await fetch(
      `https://api.eu.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json',
        },
        body: formData,
      },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Mailgun API response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      })
      throw new MailgunError(
        `Mailgun API error: ${response.status} ${response.statusText} - ${errorBody}`,
      )
    }

    return await response.json()
  } catch (err) {
    const error = err as Error
    if (error instanceof MailgunError) {
      throw error
    }
    console.error('Failed to send email:', error)
    throw new MailgunError(`Email sending failed: ${error.message}`)
  }
}

export function sendWaitlistNotification(email: string, productTitle: string) {
  const SALES_NOTIFICATION_EMAIL = Deno.env.get('SALES_NOTIFICATION_EMAIL')

  if (!SALES_NOTIFICATION_EMAIL) {
    throw new MailgunError('Missing SALES_NOTIFICATION_EMAIL configuration')
  }

  return sendEmail({
    to: SALES_NOTIFICATION_EMAIL,
    subject: 'New Waitlist Subscription',
    html: `
      <h2>New Waitlist Entry</h2>
      <p>A new user has joined the waitlist:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Product:</strong> ${productTitle}</li>
        <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
      </ul>
    `,
    text:
      `New Waitlist Entry\n\nEmail: ${email}\nProduct: ${productTitle}\nDate: ${
        new Date().toLocaleString()
      }`,
  })
}

export function sendSepaPaymentConfirmationToClient({
  to,
  orderId,
  amount,
  dueDate,
}: {
  to: string
  orderId: string
  amount: number
  dueDate: string
}) {
  const subject =
    `Order Confirmation and SEPA Payment Details for Order ${orderId}`

  const moneyAmount = {
    amount: amount,
    currencyCode: 'EUR', // You can dynamically set this based on user or settings
  }

  const htmlContent = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order! Please find below the SEPA payment details for your order ${orderId}.</p>
    <ul>
      <li><strong>Amount:</strong> ${formatCurrency(moneyAmount)}</li>
      <li><strong>Bank Name:</strong> ${bankDetails.bank}</li>
      <li><strong>Account Holder:</strong> ${bankDetails.holder}</li>
      <li><strong>IBAN:</strong> ${bankDetails.iban}</li>
      <li><strong>BIC:</strong> ${bankDetails.bic}</li>
      <li><strong>Reference Number:</strong> ${orderId}</li>
    </ul>
    <p>Please complete your transfer by <strong>${dueDate}</strong>.</p>
    <p>If we do not receive your payment by this date, your order will be automatically canceled.</p>
    <p>Thank you for choosing us!</p>
  `

  const textContent = `
    Order Confirmation\n
    Thank you for your order! Please find below the SEPA payment details for your order ${orderId}.
    \n\n
    \nAmount: ${formatCurrency(moneyAmount)}
    \nBank Name: ${bankDetails.bank}
    \nAccount Holder: ${bankDetails.holder}
    \nIBAN: ${bankDetails.iban}
    \nBIC: ${bankDetails.bic}
    \nReference Number: ${orderId}
    \n\nPlease complete your transfer by ${dueDate}.
    \nIf we do not receive your payment by this date, your order will be automatically canceled.
    \n\nThank you for choosing us!
  `

  return sendEmail({
    to,
    subject,
    html: htmlContent,
    text: textContent,
  })
}

export function sendSepaPaymentConfirmationToSales(
  orderDetails: { orderId: string; amount: Money },
) {
  const SALES_NOTIFICATION_EMAIL = Deno.env.get('SALES_NOTIFICATION_EMAIL')

  if (!SALES_NOTIFICATION_EMAIL) {
    throw new MailgunError('Missing SALES_NOTIFICATION_EMAIL configuration')
  }

  const { orderId, amount } = orderDetails

  return sendEmail({
    to: SALES_NOTIFICATION_EMAIL,
    subject: 'New SEPA Payment Intent Confirmed',
    html: `
      <h2>New SEPA Payment Intent</h2>
      <p>An order has been confirmed with SEPA payment intent:</p>
      <ul>
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Amount:</strong> ${formatCurrency(amount)}</li>
      </ul>
    `,
    text: `
      New SEPA Payment Intent\n
      Order ID: ${orderId}\n
      Amount: ${formatCurrency(amount)}\n
    `,
  })
}

export function sendPaypalPaymentNotification(
  userEmail: string,
  orderId: string,
) {
  const subject = 'Payment Received - PayPal'
  const html = `
    <h2>Thank you for your payment!</h2>
    <p>Your payment via PayPal has been successfully processed.</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p>We are now processing your order and will notify you when it ships.</p>
  `
  const text =
    `Thank you for your payment! Your PayPal payment has been successfully processed. Order ID: ${orderId}`

  return sendEmail({
    to: userEmail,
    subject,
    html,
    text,
  })
}
