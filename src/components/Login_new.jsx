import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log(isSignUp ? 'Signup submitted:' : 'Login submitted:', formData);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-[#a3b18a]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        
        {/* Green Header Section */}
        <div className="bg-[#588157] px-8 pt-12 pb-10 text-white relative">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            {/* Logo and Brand */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#588157]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-xl font-semibold">Nivaran</h1>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back!'}
            </h2>
            <p className="text-[#dad7cd]/90 text-sm">
              {isSignUp ? 'Join our community of upcyclers' : 'Sign in to continue your sustainable journey'}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Signup Only) */}
            {isSignUp && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-sm text-[#588157]/80 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-[#dad7cd]/60 text-gray-700 placeholder:text-gray-400 focus:border-[#588157] focus:outline-none focus:ring-1 focus:ring-[#588157]/20 transition-all"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm text-[#588157]/80 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-[#dad7cd]/60 text-gray-700 placeholder:text-gray-400 focus:border-[#588157] focus:outline-none focus:ring-1 focus:ring-[#588157]/20 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-[#588157]/80 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-[#dad7cd]/60 text-gray-700 placeholder:text-gray-400 focus:border-[#588157] focus:outline-none focus:ring-1 focus:ring-[#588157]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#588157] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <button
                type="button"
                className="text-sm text-[#588157]/70 hover:text-[#588157] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#588157] text-white py-3.5 rounded-lg font-semibold hover:bg-[#3a5a40] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dad7cd]/60"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#dad7cd]/60 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-[#588157]/40 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-gray-500"
              >
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <span className="text-[#588157] hover:text-[#3a5a40] font-semibold ml-1 transition-colors">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            </div>

            {/* Terms and Back Link */}
            <div className="pt-4 text-center border-t border-[#dad7cd]/60">
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                By continuing, you agree to our{' '}
                <a href="#" className="text-[#588157] hover:underline">Terms of Service</a>
                {' and '}
                <a href="#" className="text-[#588157] hover:underline">Privacy Policy</a>
              </p>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#588157] hover:text-[#3a5a40] font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Nivaran Homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
