import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function ShippingPage() {
  return (
    <>
      <Header showCategories={false} />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl mb-4 text-[#344e41]">Shipping & Returns</h1>
        <p className="text-[#3a5a40]">This is a placeholder shipping and returns policy. Replace with your official content for production.</p>
      </main>
      <Footer />
    </>
  );
}

export default ShippingPage;
