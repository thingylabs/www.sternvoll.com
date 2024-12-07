// components/Payment.tsx
export function Payment() {
  const path = '/payment-logos/assets/'
  const methods = [
    { name: 'Apple Pay', file: 'wallets/apple-pay.svg' },
    { name: 'Klarna', file: 'apm/klarna.svg' },
    { name: 'Paypal', file: 'apm/paypal.svg' },
    { name: 'Visa', file: 'cards/visa.svg' },
    { name: 'WeChat Pay', file: 'apm/wechat-pay.svg' },
    { name: 'Bitcoin', file: 'apm/crypto.svg' },
  ]
  return (
    <div class='flex space-x-2'>
      {methods.map((method) => (
        <img
          src={`${path}${method.file}`}
          alt={method.name}
          key={method.name}
          width={36}
          height={23}
          class='opacity-70 min-[425px]:w-[46px] sm:opacity-50'
          loading='lazy'
        />
      ))}
    </div>
  )
}
