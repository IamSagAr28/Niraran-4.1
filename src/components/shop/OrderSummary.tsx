import React, { useMemo, useState } from 'react'
import type { Product } from '../../data/products'

export default function OrderSummary({ items, onApplyCoupon }: { items: (Product & { qty: number })[]; onApplyCoupon: (code: string) => void }) {
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])
  const shipping = subtotal > 100 ? 0 : 6.99
  const taxes = subtotal * 0.06
  const [code, setCode] = useState('')

  const goal = 999
  const progress = Math.min(1, subtotal / goal)

  return (
    <aside className="bg-white p-4 rounded shadow-sm lg:sticky lg:top-28">
      <h4 className="font-semibold mb-3">Order summary</h4>

      <div className="space-y-2">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm"><span>Taxes</span><span>₹{taxes.toFixed(2)}</span></div>

        <div className="border-t pt-3 mt-2">
          <div className="flex justify-between items-baseline">
            <span className="font-medium text-base">Total</span>
            <span className="font-extrabold text-2xl text-[#DBB520]">₹{(subtotal + shipping + taxes).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="my-4">
        {subtotal < goal ? (
          <div className="bg-[#FFF6D1] border-l-4 border-[#F8D548] text-[#2A2A2A] p-3 rounded">
            <div className="flex items-center gap-2">
              {/* celebratory icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#DBB520]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm9-4v3H9v2h2v3h2v-3h2v-2h-2V6H11z" />
              </svg>
              <div className="text-sm">
                Add <span className="font-semibold">₹{(goal - subtotal).toFixed(2)}</span> more to get Free Shipping!
              </div>
            </div>

            <div className="mt-2 h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-2 bg-[#F8D548] rounded" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <div className="text-xs text-gray-600 mt-1">You're {Math.round(progress * 100)}% of the way to Free Shipping</div>
          </div>
        ) : (
          <div className="bg-[#FFF6D1] border-l-4 border-[#F8D548] text-[#2A2A2A] p-3 rounded text-sm">You've unlocked Free Shipping — nice!</div>
        )}
      </div>

      <div className="mt-2">
        <label className="text-sm">Promo code</label>
        <div className="mt-2 flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" className="flex-1 rounded border border-[#F8D548] px-2 py-1" />
          <button onClick={() => onApplyCoupon(code)} className="bg-[#F8D548] text-[#2A2A2A] px-3 rounded hover:bg-[#DBB520] transition-colors">Apply</button>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full bg-[#F8D548] text-[#2A2A2A] py-3 rounded hover:bg-[#DBB520] transition-colors">Proceed to Checkout</button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#DBB520]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM3 16a4 4 0 008 0H3z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Secure Checkout</span>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-3 mt-2">
          <div className="h-6 px-2 bg-gray-100 rounded text-xs flex items-center">Visa</div>
          <div className="h-6 px-2 bg-gray-100 rounded text-xs flex items-center">MasterCard</div>
          <div className="h-6 px-2 bg-gray-100 rounded text-xs flex items-center">PayPal</div>
        </div>

        <div className="text-xs text-gray-500 mt-2 text-center">✓ Free Returns for 30 Days &nbsp;•&nbsp; Trusted payment & security</div>
      </div>
    </aside>
  )
}
