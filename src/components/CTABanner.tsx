import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function CTABanner() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/newsletter/subscribe`, {
        email
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setEmail(''); // Clear the input
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 mb-0 bg-[#2A2A2A] border-t-4 border-b-4 border-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#3A3A3A] to-[#2A2A2A] rounded-2xl border-4 border-black shadow-2xl p-12 mb-8">
          <div className="text-center space-y-6">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#F8D548] drop-shadow-lg">
              Join the Sustainable Revolution
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              Subscribe to our newsletter and get{' '}
              <span className="text-[#F8D548] font-bold bg-black/30 px-3 py-1 rounded-lg">
                10% off your first purchase
              </span>
              . Stay updated with new collections, workshops, and sustainability tips.
            </p>

            {/* Success/Error Messages */}
            {message && (
              <div className="bg-green-500/20 border-2 border-green-500 text-green-100 px-6 py-4 rounded-lg font-medium">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 text-red-100 px-6 py-4 rounded-lg font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="pt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl bg-white text-[#2A2A2A] placeholder:text-gray-500 border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#F8D548] text-lg font-medium shadow-lg disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 bg-[#F8D548] text-[#2A2A2A] hover:bg-[#DBB520] rounded-xl transition-all font-bold text-lg border-4 border-black shadow-lg hover:shadow-2xl transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}