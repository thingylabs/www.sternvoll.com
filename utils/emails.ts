// utils/emails.ts
import { formatCurrency } from '@/utils/data.ts'
import { Money } from '@/utils/types.ts'
import { meta } from '@/config/meta.ts'
import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses'

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

const bankDetails = meta.sepa

class SesError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SesError'
  }
}

const ses = new SESClient({
  region: Deno.env.get('AWS_REGION')!,
  credentials: {
    accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID')!,
    secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
  },
})

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const FROM_EMAIL = Deno.env.get('FROM_EMAIL')

  if (!FROM_EMAIL) {
    throw new SesError('Missing FROM_EMAIL configuration')
  }

  if (!html && !text) {
    throw new SesError('No email body provided (html or text required).')
  }

  const params: SendEmailCommandInput = {
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        ...(html ? { Html: { Data: html } } : {}),
        ...(text ? { Text: { Data: text } } : {}),
      },
    },
  }

  try {
    const command = new SendEmailCommand(params)
    const response = await ses.send(command)
    return response
  } catch (err) {
    const error = err as Error
    console.error('Failed to send email via SES:', error)
    throw new SesError(`Email sending failed: ${error.message}`)
  }
}

export function sendWaitlistNotification(email: string, productTitle: string) {
  const SALES_NOTIFICATION_EMAIL = Deno.env.get('SALES_NOTIFICATION_EMAIL')

  if (!SALES_NOTIFICATION_EMAIL) {
    throw new SesError('Missing SALES_NOTIFICATION_EMAIL configuration')
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
    currencyCode: 'EUR',
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
    Order Confirmation
    Thank you for your order! Please find below the SEPA payment details for your order ${orderId}.

    Amount: ${formatCurrency(moneyAmount)}
    Bank Name: ${bankDetails.bank}
    Account Holder: ${bankDetails.holder}
    IBAN: ${bankDetails.iban}
    BIC: ${bankDetails.bic}
    Reference Number: ${orderId}

    Please complete your transfer by ${dueDate}.
    If we do not receive your payment by this date, your order will be automatically canceled.

    Thank you for choosing us!
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
    throw new SesError('Missing SALES_NOTIFICATION_EMAIL configuration')
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
      New SEPA Payment Intent

      Order ID: ${orderId}
      Amount: ${formatCurrency(amount)}
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
