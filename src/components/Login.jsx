import React, { useState } from 'react';
import { useRouter } from '../utils/Router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { navigateTo } = useRouter();

  return (
    <>
      <style>{`
        .login-header-bg {
          background-color: #FFEB3B !important;
        }
        .login-button-bg {
          background-color: #FFEB3B !important;
        }
        .login-button-bg:hover {
          background-color: #FDD835 !important;
        }
        .login-text-color {
          color: #FFEB3B !important;
        }
        .login-logo-bg {
          background-color: #FFEB3B !important;
        }
      `}</style>
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-[440px] shadow-2xl">

        {/* Lemon Yellow Header */}
        <div className="login-header-bg bg-[#FFEB3B] text-[#2A2A2A] text-center px-8 py-10 relative rounded-t-2xl" style={{ backgroundColor: '#FFEB3B' }}>
          <button onClick={onClose} className="absolute top-6 left-6 text-[#2A2A2A]/90 hover:text-[#2A2A2A]">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="login-logo-bg w-6 h-6 bg-[#FFEB3B] rounded" style={{ backgroundColor: '#FFEB3B' }}></div>
            </div>
            <span className="text-lg font-medium">Nivaran</span>
          </div>

          <h2 className="text-2xl font-semibold mb-2">Welcome Back!</h2>
          <p className="text-sm text-[#2A2A2A]/80">Sign in to continue your sustainable journey</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/20 focus:border-[#FFEB3B]"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/20 focus:border-[#FFEB3B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-left">
              <button type="button" className="text-sm text-gray-500">Forgot Password?</button>
            </div>

            <button type="submit" className="login-button-bg w-full bg-[#FFEB3B] text-[#2A2A2A] py-3 rounded-lg font-medium hover:bg-[#FDD835]" style={{ backgroundColor: '#FFEB3B' }}>
              Sign In
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">or</span></div>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account? <button type="button" className="login-text-color text-[#FFEB3B] font-medium hover:underline" style={{ color: '#FFEB3B' }}>Sign Up</button>
            </p>

            <div className="text-center pt-4 mt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-3">
                By continuing, you agree to our <button type="button" onClick={() => navigateTo('/terms')} className="login-text-color text-[#FFEB3B]" style={{ color: '#FFEB3B' }}>Terms of Service</button> and <button type="button" onClick={() => navigateTo('/privacy')} className="login-text-color text-[#FFEB3B]" style={{ color: '#FFEB3B' }}>Privacy Policy</button>
              </p>
              <button type="button" onClick={onClose} className="login-text-color text-sm text-[#FFEB3B] flex items-center gap-1 mx-auto" style={{ color: '#FFEB3B' }}>
                <ArrowLeft className="w-4 h-4" />
                Back to Nivaran Homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
