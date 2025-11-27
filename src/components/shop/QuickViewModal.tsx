import React, {useState} from 'react'
import type { Product } from '../../data/products'

export default function QuickViewModal({product, open, onClose, onAddToCart}:{product:Product|null; open:boolean; onClose:()=>void; onAddToCart:(p:Product)=>void}){
  const [qty, setQty] = useState(1)
  
  if (!open || !product) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#48634A]">Quick View</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={product.images[0]} alt={product.title} className="w-full rounded-lg" />
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-[#48634A] mb-2">{product.title}</h3>
            <p className="text-3xl font-bold text-[#48634A] mb-4">₹{product.price.toFixed(2)}</p>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-600"><strong>Category:</strong> {product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600"><strong>Material:</strong> {product.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600"><strong>Colors:</strong> {product.colors.join(', ')}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={()=>setQty(Math.max(1, qty-1))} className="w-10 h-10 bg-[#48634A] text-white rounded hover:bg-opacity-90">-</button>
                <input type="number" value={qty} onChange={(e)=>setQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center border border-gray-300 rounded px-2 py-1" />
                <button onClick={()=>setQty(qty+1)} className="w-10 h-10 bg-[#48634A] text-white rounded hover:bg-opacity-90">+</button>
              </div>
            </div>

            <button 
              onClick={()=>{
                for(let i = 0; i < qty; i++) onAddToCart(product)
                onClose()
              }}
              className="w-full bg-[#48634A] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
