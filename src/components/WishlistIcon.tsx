import React from 'react'

export default function WishlistIcon({filled, onClick}:{filled:boolean; onClick:()=>void}){
  return (
    <button 
      onClick={onClick}
      className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
      aria-label="Add to wishlist"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-5 w-5 transition-colors ${filled ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
        viewBox="0 0 24 24" 
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
