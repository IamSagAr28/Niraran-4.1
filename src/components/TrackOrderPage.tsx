import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Placeholder behavior: In production, query Shopify Orders or store backend
  };

  return (
    <>
      <Header showCategories={false} />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl mb-4 text-[#344e41]">Track Your Order</h1>
        <form onSubmit={submit} className="max-w-md bg-white p-6 rounded shadow">
          <label className="block text-sm text-[#3a5a40] mb-2">Order ID</label>
          <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter order id" className="w-full border px-3 py-2 rounded mb-4" />
          <button type="submit" className="px-4 py-2 bg-[#588157] text-white rounded">Track</button>
        </form>

        {submitted && (
          <div className="mt-6 text-[#343a3b]">Tracking is not enabled in demo. Replace with API integration to show status.</div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default TrackOrderPage;
