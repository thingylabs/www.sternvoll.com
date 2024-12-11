// islands/Checkout.tsx
import { useSignal } from '@preact/signals'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { useCart } from '@/utils/data.ts'
import { PAYMENT_METHOD_KEY } from '@/utils/types.ts'
import { TranslationMap } from '@/translations.ts'

export const translationKeys = [
  'Pay with PayPal',
  'OR PAY WITH BANK TRANSFER',
  'Continue to Payment Details',
  'First Name',
  'Last Name',
  'Email',
  'optional',
  'Phone Number',
  'Street Address',
  'Postal Code',
  'Country',
  'Please provide either an email address or phone number',
] as const

const STORAGE_KEY = 'checkout_data'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

type FieldConfig = {
  name: keyof FormData
  label: string
  type: string
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  colSpan?: number
}

let FORM_FIELDS: FieldConfig[]

function FormField(
  { field, value, onChange }: {
    field: FieldConfig
    value: string
    onChange: (e: Event) => void
  },
) {
  const baseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

  const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
  }[field.colSpan ?? 1]

  return (
    <div class={colSpanClasses}>
      <label class='block text-sm font-medium text-gray-700 mb-1'>
        {field.label}
      </label>
      {field.type === 'select'
        ? (
          <select
            required={field.required}
            class={`${baseClasses} bg-white`}
            value={value}
            onChange={onChange}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
        : (
          <input
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            class={baseClasses}
            value={value}
            onChange={onChange}
          />
        )}
    </div>
  )
}

export function Checkout(
  { t, PAYPAL_URL }: { t: TranslationMap; PAYPAL_URL: string },
) {
  const { data: cart } = useCart()

  FORM_FIELDS = [
    {
      name: 'firstName',
      label: t['First Name'],
      type: 'text',
      required: true,
      colSpan: 1,
    },
    {
      name: 'lastName',
      label: t['Last Name'],
      type: 'text',
      required: true,
      colSpan: 1,
    },
    {
      name: 'email',
      label: t['Email'] + ' (' + t['optional'] + ')',
      type: 'email',
      placeholder: 'your@email.com',
      colSpan: 2,
    },
    {
      name: 'phone',
      label: t['Phone Number'] + ' (' + t['optional'] + ')',
      type: 'tel',
      placeholder: '+49 123 45678900',
      colSpan: 2,
    },
    {
      name: 'address',
      label: t['Street Address'],
      type: 'text',
      required: true,
      colSpan: 2,
    },
    { name: 'city', label: 'City', type: 'text', required: true, colSpan: 1 },
    {
      name: 'postalCode',
      label: t['Postal Code'],
      type: 'text',
      required: true,
      colSpan: 1,
    },
    {
      name: 'country',
      label: t['Country'],
      type: 'select',
      required: true,
      colSpan: 2,
      options: [{ value: 'DE', label: 'Germany' }],
    },
  ]

  const initialData: FormData = IS_BROWSER
    ? JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null') ?? {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'DE',
    }
    : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'DE',
    }

  const formData = useSignal<FormData>(initialData)

  const handlePayWithPayPal = async () => {
    if (!cart || cart.lines.nodes.length === 0) {
      alert('Your cart is empty!')
      return
    }

    sessionStorage.setItem(PAYMENT_METHOD_KEY, 'paypal')

    try {
      // Map cart items for PayPal API
      const items = cart.lines.nodes.map((line) => ({
        name: line.merchandise.product.title,
        description: line.merchandise.title !== line.merchandise.product.title
          ? line.merchandise.title
          : undefined,
        unit_amount: {
          currency_code: line.estimatedCost.totalAmount.currencyCode,
          value: (Number(line.estimatedCost.totalAmount.amount) / line.quantity)
            .toFixed(2),
        },
        quantity: line.quantity.toString(),
        category: 'PHYSICAL_GOODS', // Assuming all items are physical goods
      }))

      // Create order on the server
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cart.estimatedCost.totalAmount.amount,
          currency: cart.estimatedCost.totalAmount.currencyCode,
          items,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create PayPal order')
      }

      const { id: orderId } = await response.json()

      // Redirect to PayPal
      globalThis.location.href = `${PAYPAL_URL}/checkoutnow?token=${orderId}`
    } catch (error) {
      console.error('Error creating PayPal order:', error)
      alert('Could not initiate PayPal checkout. Please try again.')
    }
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (!IS_BROWSER) return

    if (!formData.value.email && !formData.value.phone) {
      alert(t['Please provide either an email address or phone number'])
      return
    }

    try {
      // Store in session before navigating
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData.value))

      // Navigate directly to review page
      globalThis.location.href = '/checkout/review'
    } catch (error) {
      console.error('Error saving form data:', error)
    }
  }

  const handleInputChange = (field: keyof FormData) => (e: Event) => {
    const newValue = {
      ...formData.value,
      [field]: (e.target as HTMLInputElement).value,
    }
    formData.value = newValue

    // Save each change to session storage
    if (IS_BROWSER) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    }
  }

  return (
    <div class='space-y-8'>
      {/* PayPal Section */}
      <div class='bg-white p-6 rounded-lg shadow'>
        <div class='text-center'>
          <button
            disabled={!IS_BROWSER || !cart}
            onClick={handlePayWithPayPal}
            class='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {t['Pay with PayPal']}
          </button>
        </div>
      </div>

      {/* Separator */}
      <div class='relative'>
        <div class='absolute inset-0 flex items-center'>
          <div class='w-full border-t border-secondary'></div>
        </div>
        <div class='relative flex justify-center text-sm'>
          <span class='px-2 bg-secondary text-black'>
            {t['OR PAY WITH BANK TRANSFER']}
          </span>
        </div>
      </div>

      {/* Form Section */}
      <div class='bg-white p-6 rounded-lg shadow'>
        <form onSubmit={handleSubmit} class='space-y-6'>
          {/* Form Fields Grid */}
          <div class='grid grid-cols-2 gap-4'>
            {FORM_FIELDS.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formData.value[field.name]}
                onChange={handleInputChange(field.name)}
              />
            ))}
          </div>

          <button
            type='submit'
            class='w-full bg-secondary text-white py-3 px-4 rounded font-medium hover:bg-secondary-light transition-colors'
          >
            {t['Continue to Payment Details']}
          </button>
        </form>
      </div>
    </div>
  )
}
