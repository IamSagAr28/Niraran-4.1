export type Product = {
  id: string
  title: string
  price: number
  images: string[]
  category: string
  colors: string[]
  material: string
  createdAt: string
  rating?: number
}

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Organic Cotton Tote Bag',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1543165365-c3f8b1f8c3a0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2'
    ],
    category: 'Bags',
    colors: ['Natural', 'Green'],
    material: 'Organic Cotton',
    createdAt: '2025-10-01'
  },
  {
    id: 'p2',
    title: 'Handmade Jute Rug',
    price: 89.0,
    images: [
      'https://images.unsplash.com/photo-1549187774-b4f2b4b3f9c8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3',
      'https://images.unsplash.com/photo-1505691723518-36a6d5432a88?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4'
    ],
    category: 'Home',
    colors: ['Beige', 'Brown'],
    material: 'Jute',
    createdAt: '2025-11-15'
  },
  {
    id: 'p3',
    title: 'Bamboo Cutting Board',
    price: 35.5,
    images: [
      'https://images.unsplash.com/photo-1543353071-087092ec393d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5',
      'https://images.unsplash.com/photo-1523475496153-3d6cc4d0d5f9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6'
    ],
    category: 'Kitchen',
    colors: ['Natural'],
    material: 'Bamboo',
    createdAt: '2025-09-20'
  },
  {
    id: 'p4',
    title: 'Recycled Glass Bottle Set',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1582719478170-8a3fa2bfe7b3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7',
      'https://images.unsplash.com/photo-1567016546149-2f3c3d7dec10?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8'
    ],
    category: 'Kitchen',
    colors: ['Green', 'Blue'],
    material: 'Recycled Glass',
    createdAt: '2025-11-01'
  },
  {
    id: 'p5',
    title: 'Upcycled Denim Pouch',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1599351318032-9a43a4e4d9b4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9',
      'https://images.unsplash.com/photo-1591561939119-931627917a86?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=10'
    ],
    category: 'Accessories',
    colors: ['Blue'],
    material: 'Upcycled Denim',
    createdAt: '2025-11-20'
  },
  {
    id: 'p6',
    title: 'Coconut Shell Bowl',
    price: 12.50,
    images: [
      'https://images.unsplash.com/photo-1588144249196-64516d306b3a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=11',
      'https://images.unsplash.com/photo-1601004999333-3111f3c5f212?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=12'
    ],
    category: 'Kitchen',
    colors: ['Brown'],
    material: 'Coconut Shell',
    createdAt: '2025-10-15'
  },
  {
    id: 'p7',
    title: 'Reclaimed Wood Clock',
    price: 75.00,
    images: [
      'https://images.unsplash.com/photo-1596707342343-ce9575991807?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=13',
      'https://images.unsplash.com/photo-1612178742468-f3d9d7c35e4e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=14'
    ],
    category: 'Home',
    colors: ['Dark Wood'],
    material: 'Reclaimed Wood',
    createdAt: '2025-11-25'
  },
  {
    id: 'p8',
    title: 'Newspaper Weave Coasters',
    price: 9.99,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7FEB511?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=15',
      'https://images.unsplash.com/photo-1567016376288-5a1c97a59e0a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=16'
    ],
    category: 'Kitchen',
    colors: ['Multicolor'],
    material: 'Recycled Newspaper',
    createdAt: '2025-09-30'
  },
  {
    id: 'p9',
    title: 'Tire Tube Wallet',
    price: 29.50,
    images: [
      'https://images.unsplash.com/photo-1512413317822-79a781b495b6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=17',
      'https://images.unsplash.com/photo-1621457335766-8a4365c0f3d4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=18'
    ],
    category: 'Accessories',
    colors: ['Black'],
    material: 'Recycled Tire Tube',
    createdAt: '2025-11-10'
  }
]
