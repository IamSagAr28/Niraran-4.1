import React, { useState } from 'react';
import { useRouter } from '../utils/Router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Login = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (isSignUp) {
        setSuccess('Account created successfully! Welcome to Nivaran.');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    }, 1500);
  };

  const { navigateTo } = useRouter();

  return (
    <div className="fixed inset-0 bg-[#2A2A2A]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>

        {/* Green Header Section */}
        <div className="bg-[#F8D548] px-8 pt-12 pb-10 text-[#2A2A2A] relative">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            {/* Logo and Brand */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#F8D548]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold">Nivaran</h1>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back!'}
            </h2>
            <p className="text-[#2A2A2A]/90 text-sm">
              {isSignUp ? 'Join our community of upcyclers' : 'Sign in to continue your sustainable journey'}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <p className="text-sm text-yellow-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Signup Only) */}
            {isSignUp && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-sm text-[#2A2A2A]/80 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#F8D548]/60 text-gray-700 placeholder:text-gray-400 focus:border-[#F8D548] focus:outline-none focus:ring-2 focus:ring-[#F8D548]/20 transition-all duration-200"
                  required
                  minLength={2}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm text-[#2A2A2A]/80 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#F8D548]/60 text-gray-700 placeholder:text-gray-400 focus:border-[#F8D548] focus:outline-none focus:ring-2 focus:ring-[#F8D548]/20 transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-[#2A2A2A]/80 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#F8D548]/60 text-gray-700 placeholder:text-gray-400 focus:border-[#F8D548] focus:outline-none focus:ring-2 focus:ring-[#F8D548]/20 transition-all duration-200 pr-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F8D548] transition-colors duration-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
              )}
            </div>

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-left">
                <button
                  type="button"
                  className="text-sm text-[#F8D548]/70 hover:text-[#F8D548] transition-colors duration-200"
                  onClick={() => {
                    setError('Password reset functionality coming soon! Please contact support.');
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F8D548] text-[#2A2A2A] py-3.5 rounded-lg font-semibold hover:bg-[#DBB520] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F8D548]/60"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => window.location.href = 'http://localhost:3000/auth/google'}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#F8D548]/60 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-[#F8D548]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-sm text-gray-500 hover:text-[#F8D548] transition-colors duration-200"
              >
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <span className="text-[#F8D548] hover:text-[#DBB520] font-semibold ml-1 transition-colors duration-200">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            </div>

            {/* Terms and Back Link */}
            <div className="pt-4 text-center border-t border-[#F8D548]/60">
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                By continuing, you agree to our{' '}
                <button type="button" onClick={() => navigateTo('/terms')} className="text-[#F8D548] hover:underline">Terms of Service</button>
                {' and '}
                <button type="button" onClick={() => navigateTo('/privacy')} className="text-[#F8D548] hover:underline">Privacy Policy</button>
              </p>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#F8D548] hover:text-[#DBB520] font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
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
