import React from 'react'
import type { Product } from '../../data/products'

export default function CartItem({
  item,
  onChangeQty,
  onRemove,
  onSaveForLater
}:{
  item:Product & {qty:number};
  onChangeQty:(id:string, qty:number)=>void;
  onRemove:(id:string)=>void;
  onSaveForLater?:(id:string)=>void;
}){
  return (
    <div className="flex gap-6 items-start p-4 bg-gray-50 rounded shadow border border-gray-100">
      {/* Thumbnail */}
      <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />

      <div className="flex-1">
        <h4 className="font-semibold text-[#48634A]">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.material}</p>
        <p className="text-sm mt-1"><span className="font-medium">Item Price:</span> ₹{item.price.toFixed(2)}</p>

        <div className="mt-3 flex items-center gap-3">
          <button aria-label={`Decrease ${item.title} quantity`} onClick={()=>onChangeQty(item.id, Math.max(1, item.qty-1))} className="w-9 h-9 bg-[#48634A] text-white rounded-md hover:bg-[#3A503C] transition-colors flex items-center justify-center">-</button>
          <div className="px-3 py-1 bg-white border border-[#C9D7C3] rounded font-medium">{item.qty}</div>
          <button aria-label={`Increase ${item.title} quantity`} onClick={()=>onChangeQty(item.id, item.qty+1)} className="w-9 h-9 bg-[#48634A] text-white rounded-md hover:bg-[#3A503C] transition-colors flex items-center justify-center">+</button>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm">
          <button onClick={()=>onRemove(item.id)} className="text-gray-500 hover:text-red-600 flex items-center gap-2">
            {/* trash icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
            </svg>
            Remove
          </button>

          <button onClick={()=>onSaveForLater ? onSaveForLater(item.id) : alert('Saved for later (demo)')} className="text-gray-500 hover:text-[#48634A] flex items-center gap-2">
            {/* bookmark icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
            </svg>
            Save for later
          </button>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-lg text-[#48634A]">₹{(item.price * item.qty).toFixed(2)}</p>
      </div>
    </div>
  )
}
