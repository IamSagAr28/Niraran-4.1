import React, {useMemo, useState} from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import ProductCard from './ProductCard'
import FilterSidebar from './FilterSidebar'
import QuickViewModal from './QuickViewModal'
import { useShopCart } from '../../contexts/ShopCartContext'
import type { Product } from '../../data/products'
import { products as sampleProducts } from '../../data/products'

export default function ShopPage(){
  const { addToCart } = useShopCart()
  const [filters, setFilters] = useState<any>({})
  const [sort, setSort] = useState<string>('newest')
  const [quick, setQuick] = useState<Product | null>(null)
  const [quickOpen, setQuickOpen] = useState(false)

  const filtered = useMemo(()=>{
    let list = [...sampleProducts]
    if(filters.category && filters.category !== 'All') list = list.filter(p=>p.category===filters.category)
    if(filters.price) list = list.filter(p=>p.price <= filters.price)
    if(filters.color && filters.color !== 'Any') list = list.filter(p=>p.colors.includes(filters.color))
    if(filters.material && filters.material !== 'Any') list = list.filter(p=>p.material === filters.material)
    if(sort === 'low-high') list.sort((a,b)=>a.price-b.price)
    if(sort === 'high-low') list.sort((a,b)=>b.price-a.price)
    if(sort === 'newest') list.sort((a,b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return list
  }, [filters, sort])

  return (
    <div className="flex flex-col min-h-screen">
      <Header showCategories={false} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <a href="/" className="text-[#48634A] text-sm hover:underline">{'< Back to Home'}</a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3 sticky top-8 self-start">
              <FilterSidebar products={sampleProducts} onChange={setFilters} />
            </div>
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#48634A]">Products</h2>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Sort by</label>
                  <select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-md border border-[#C9D7C3] px-3 py-2 text-sm focus:ring-1 focus:ring-[#48634A] focus:border-[#48634A]">
                    <option value="newest">Newest</option>
                    <option value="low-high">Price: low to high</option>
                    <option value="high-low">Price: high to low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map(p=> (
                  <ProductCard key={p.id} product={p} onQuickView={(pr)=>{setQuick(pr); setQuickOpen(true)}} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickViewModal product={quick} open={quickOpen} onClose={()=>setQuickOpen(false)} onAddToCart={addToCart} />
      
      <Footer />
    </div>
  )
}
