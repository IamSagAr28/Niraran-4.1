import React, { useMemo, useState, useEffect } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import ProductCard from './ProductCard'
import FilterSidebar from './FilterSidebar'
import QuickViewModal from './QuickViewModal'
import { useShopCart } from '../../contexts/ShopCartContext'
import { useRouter } from '../../utils/Router'
import type { Product } from '../../data/products'
import { products as sampleProducts } from '../../data/products'
import { Home, ArrowLeft } from 'lucide-react'

export default function ShopPage() {
  const { addToCart } = useShopCart()
  const { navigateTo } = useRouter()
  const [filters, setFilters] = useState<any>({})
  const [sort, setSort] = useState<string>('newest')
  const [quick, setQuick] = useState<Product | null>(null)
  const [quickOpen, setQuickOpen] = useState(false)

  // Read category from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    if (category) {
      setFilters((prev: any) => ({ ...prev, category: decodeURIComponent(category) }))
    }
  }, [])

  // Update URL when filters change
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)

    // Update URL with category param
    if (newFilters.category && newFilters.category !== 'All') {
      const newUrl = `/shop?category=${encodeURIComponent(newFilters.category)}`
      window.history.pushState({}, '', newUrl)
    } else {
      window.history.pushState({}, '', '/shop')
    }
  }

  const filtered = useMemo(() => {
    let list = [...sampleProducts]
    if (filters.category && filters.category !== 'All') list = list.filter(p => p.category === filters.category)
    if (filters.price) list = list.filter(p => p.price <= filters.price)
    if (filters.color && filters.color !== 'Any') list = list.filter(p => p.colors.includes(filters.color))
    if (filters.material && filters.material !== 'Any') list = list.filter(p => p.material === filters.material)
    if (sort === 'low-high') list.sort((a, b) => a.price - b.price)
    if (sort === 'high-low') list.sort((a, b) => b.price - a.price)
    if (sort === 'newest') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return list
  }, [filters, sort])

  return (
    <div className="flex flex-col min-h-screen">
      <Header showCategories={false} />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-[#48634A] hover:text-[#588157] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#588157] focus:ring-offset-2 rounded-lg px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2 text-[#48634A] hover:text-[#588157] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#588157] focus:ring-offset-2 rounded-lg px-3 py-2"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3 sticky top-8 self-start">
              <FilterSidebar products={sampleProducts} onChange={handleFilterChange} />
            </div>
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#48634A]">Products</h2>
                  {filters.category && filters.category !== 'All' && (
                    <p className="text-sm text-gray-600 mt-1">Category: {filters.category}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Sort by</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-[#C9D7C3] px-3 py-2 text-sm focus:ring-1 focus:ring-[#48634A] focus:border-[#48634A] focus:outline-none">
                    <option value="newest">Newest</option>
                    <option value="low-high">Price: low to high</option>
                    <option value="high-low">Price: high to low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onQuickView={(pr) => { setQuick(pr); setQuickOpen(true) }} onAddToCart={addToCart} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <QuickViewModal product={quick} open={quickOpen} onClose={() => setQuickOpen(false)} onAddToCart={addToCart} />

      <Footer />
    </div>
  )
}
