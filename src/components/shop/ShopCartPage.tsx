import React from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'
import { useShopCart } from '../../contexts/ShopCartContext'
import type { Product } from '../../data/products'
import { products } from '../../data/products'

export default function ShopCartPage(){
  const { cart, setCart, addToCart } = useShopCart()

  function changeQty(id:string, qty:number){
    setCart(cart.map(i=> i.id===id ? {...i, qty} : i))
  }
  function remove(id:string){
    setCart(cart.filter(i=>i.id!==id))
  }
  function saveForLater(id:string){
    // demo behavior: remove from cart and notify
    alert('Saved for later (demo)')
    remove(id)
  }
  function applyCoupon(code:string){
    // demo: accept SAVE10 for 10% off
    if(code.toUpperCase() === 'SAVE10'){
      alert('10% applied (demo only)')
    } else {
      alert('Invalid code')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header showCategories={false} />
      
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-3xl font-serif font-bold text-[#48634A]">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="p-6 bg-white rounded text-center">
                  <p className="mb-4">Your cart is empty</p>
                  <a href="/shop" className="text-[#48634A] hover:underline font-medium">Back to Products</a>
                </div>
              ) : (
                <>
                  {cart.map(it=> <CartItem key={it.id} item={it} onChangeQty={changeQty} onRemove={remove} onSaveForLater={saveForLater} />)}

                  {/* Cross-sell / Recommendations */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Don't forget these!</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {products.filter(p=>!cart.find(c=>c.id===p.id)).slice(0,4).map(p=> (
                        <div key={p.id} className="p-3 bg-white rounded shadow-sm flex flex-col items-start">
                          <img src={p.images[0]} alt={p.title} className="w-full h-20 object-cover rounded mb-2" />
                          <div className="text-sm font-medium text-[#48634A]">{p.title}</div>
                          <div className="text-sm text-gray-600">₹{p.price.toFixed(2)}</div>
                          <button onClick={()=>addToCart(p)} className="mt-3 w-full bg-[#48634A] text-white text-sm py-2 rounded hover:bg-[#3A503C] transition">Add</button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#48634A]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2H2V5zM2 9h16v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
                        </svg>
                        <span>Questions? Chat with us</span>
                      </div>
                      <div>Free Returns for 30 Days</div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-6 flex justify-between items-center">
                <a href="/shop" className="border border-[#48634A] text-[#48634A] px-4 py-2 rounded-md hover:bg-[#48634A] hover:text-white transition">Continue Shopping</a>
                <p className="text-sm italic text-[#6B8B6D]">Your purchase supports our women artisans and saves waste from landfills.</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary items={cart} onApplyCoupon={applyCoupon} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
