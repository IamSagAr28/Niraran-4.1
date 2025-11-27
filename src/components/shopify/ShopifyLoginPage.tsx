import React, { useState } from 'react';
// @ts-ignore
import { useRouter } from '../../utils/Router';
import { useAuth } from '../../contexts/AuthContext';
import { googleLoginUrl } from '../../utils/authApi';
import './ShopifyLoginPage.css';

const ShopifyLoginPage = () => {
  const { navigateTo } = useRouter();
  const { login, signup, recoverPassword } = useAuth();
  const [view, setView] = useState<'login' | 'signup' | 'forgot-password'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (view === 'login') {
        await login(formData.email, formData.password);
        // Redirect to account page or home
        navigateTo('/');
      } else if (view === 'signup') {
        await signup(
          formData.email, 
          formData.password, 
          formData.firstName, 
          formData.lastName
        );
        // Auto login after signup or show success message
        setView('login');
        setError('Account created successfully! Please sign in.');
      } else if (view === 'forgot-password') {
        await recoverPassword(formData.email);
        setError('Password reset email sent. Please check your inbox.');
        setTimeout(() => setView('login'), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-container">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={() => navigateTo('/')}>←</button>
          <div className="logo-container">
            <div className="logo">
              <img src="/images/logo.png" alt="Nivaran Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
            </div>
            <span className="brand-name">Nivaran</span>
          </div>
          <h2>
            {view === 'login' && 'Welcome Back!'}
            {view === 'signup' && 'Join the Movement'}
            {view === 'forgot-password' && 'Reset Password'}
          </h2>
          <p>
            {view === 'login' && 'Sign in to continue your sustainable journey'}
            {view === 'signup' && 'Create an account to start shopping sustainably'}
            {view === 'forgot-password' && 'Enter your email to receive reset instructions'}
          </p>
        </div>

        {/* Form */}
        <div className="form-container">
          {error && (
            <div className={error.includes('success') ? 'success-message' : 'error-message'}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {view === 'signup' && (
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            {view !== 'forgot-password' && (
              <div className="form-group">
                <label className="form-label">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Password
                </label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {view === 'login' && (
              <button 
                type="button" 
                className="forgot-password"
                onClick={() => setView('forgot-password')}
              >
                Forgot Password?
              </button>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Loading...' : (
                <>
                  {view === 'login' && 'Sign In'}
                  {view === 'signup' && 'Create Account'}
                  {view === 'forgot-password' && 'Send Reset Link'}
                </>
              )}
            </button>

            {view === 'login' && (
              <>
                <div className="divider"><span>or</span></div>

                <button 
                  type="button" 
                  className="google-btn"
                  onClick={() => window.location.href = googleLoginUrl}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <p className="signup-text">
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    className="signup-link"
                    onClick={() => setView('signup')}
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}

            {view === 'signup' && (
              <p className="signup-text">
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="signup-link"
                  onClick={() => setView('login')}
                >
                  Sign In
                </button>
              </p>
            )}

            {view === 'forgot-password' && (
              <p className="signup-text">
                Remember your password?{' '}
                <button 
                  type="button" 
                  className="signup-link"
                  onClick={() => setView('login')}
                >
                  Sign In
                </button>
              </p>
            )}

            <div className="footer">
              <p>
                By continuing, you agree to our <button type="button" onClick={() => navigateTo('/terms')} className="underline">Terms of Service</button> and <button type="button" onClick={() => navigateTo('/privacy')} className="underline">Privacy Policy</button>
              </p>
              <button 
                type="button" 
                className="back-link"
                onClick={() => navigateTo('/')}
              >
                ← Back to Nivaran Homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopifyLoginPage;
