import React, {useState} from 'react'
import type { Product } from '../../data/products'

const FilterSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-4 border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="font-bold text-[#48634A]">{title}</h5>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-[#48634A] transition-transform transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};


export default function FilterSidebar({products, onChange}:{products:Product[]; onChange:(filters:any)=>void}){
  const [category, setCategory] = useState<string>('All')
  const [price, setPrice] = useState<number>(1200)
  const [color, setColor] = useState<string>('Any')
  const [material, setMaterial] = useState<string>('Any')
  const [availability, setAvailability] = useState<string>('All')

  const categories = Array.from(new Set(products.map(p=>p.category)))
  const colors = Array.from(new Set(products.flatMap(p=>p.colors)))
  const materials = Array.from(new Set(products.map(p=>p.material)))

  function apply(){
    onChange({category, price, color, material, availability})
  }
  
  function reset(){
    setCategory('All'); 
    setPrice(1200); 
    setColor('Any'); 
    setMaterial('Any');
    setAvailability('All');
    onChange({})
  }

  return (
    <aside className="p-6 bg-[#E8F0E5] rounded-lg shadow-lg">
      <div className="space-y-2">
        
        <FilterSection title="Category">
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full bg-white rounded-md border border-[#C9D7C3] px-3 py-2 text-sm focus:ring-1 focus:ring-[#48634A] focus:border-[#48634A]">
            <option>All</option>
            {categories.map(c=><option key={c}>{c}</option>)}
          </select>
        </FilterSection>

        <FilterSection title="Price Range">
          <label className="block text-sm text-gray-600 mb-2">Max price: ₹{price}</label>
          <input type="range" min={0} max={1200} value={price} onChange={(e)=>setPrice(Number(e.target.value))} className="w-full accent-[#48634A]" />
        </FilterSection>

        <FilterSection title="Availability">
          <div className="space-y-2">
            <div className="flex items-center">
              <input id="all" type="radio" name="availability" value="All" checked={availability === 'All'} onChange={(e)=>setAvailability(e.target.value)} className="w-4 h-4 text-[#48634A] bg-gray-100 border-gray-300 focus:ring-[#48634A]"/>
              <label htmlFor="all" className="ml-2 text-sm text-gray-700">All Products</label>
            </div>
            <div className="flex items-center">
              <input id="in-stock" type="radio" name="availability" value="In Stock" checked={availability === 'In Stock'} onChange={(e)=>setAvailability(e.target.value)} className="w-4 h-4 text-[#48634A] bg-gray-100 border-gray-300 focus:ring-[#48634A]"/>
              <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">In Stock</label>
            </div>
             <div className="flex items-center">
              <input id="sold-out" type="radio" name="availability" value="Sold Out" checked={availability === 'Sold Out'} onChange={(e)=>setAvailability(e.target.value)} className="w-4 h-4 text-[#48634A] bg-gray-100 border-gray-300 focus:ring-[#48634A]"/>
              <label htmlFor="sold-out" className="ml-2 text-sm text-gray-700">Sold Out</label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Color">
          <select value={color} onChange={(e)=>setColor(e.target.value)} className="w-full bg-white rounded-md border border-[#C9D7C3] px-3 py-2 text-sm focus:ring-1 focus:ring-[#48634A] focus:border-[#48634A]">
            <option>Any</option>
            {colors.map(c=><option key={c}>{c}</option>)}
          </select>
        </FilterSection>
        
        <FilterSection title="Material">
          <select value={material} onChange={(e)=>setMaterial(e.target.value)} className="w-full bg-white rounded-md border border-[#C9D7C3] px-3 py-2 text-sm focus:ring-1 focus:ring-[#48634A] focus:border-[#48634A]">
            <option>Any</option>
            {materials.map(m=><option key={m}>{m}</option>)}
          </select>
        </FilterSection>

        <div className="flex gap-4 pt-6">
          <button onClick={apply} className="flex-1 bg-[#48634A] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm font-semibold">Apply</button>
          <button onClick={reset} className="flex-1 px-4 py-2 rounded-md border border-[#48634A] text-[#48634A] bg-white hover:bg-gray-50 transition-colors text-sm font-semibold">Reset</button>
        </div>
      </div>
    </aside>
  )
}
