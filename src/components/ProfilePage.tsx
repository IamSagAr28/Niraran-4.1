import React, { useState } from 'react';
import { Header } from './Header.tsx';
import { Footer } from './Footer';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/Router';
import {
  User, Mail, Edit, Save, X, ArrowLeft, Shield, Bell,
  Lock, Key, Smartphone, LogOut, ChevronRight, Home
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { navigateTo } = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!isAuthenticated || !user) {
    navigateTo('/');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update profile:', error);
      showToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || ''
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'security', label: 'Login & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header showCategories={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigateTo('/dashboard')}
              className="flex items-center space-x-2 text-gray-500 hover:text-[#F8D548] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2 rounded-lg px-3 py-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center space-x-2 text-gray-500 hover:text-[#F8D548] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2 rounded-lg px-3 py-2"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2 ${activeTab === tab.id
                      ? 'bg-[#F8D548]/10 text-[#DBB520]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#DBB520]' : 'text-gray-400'}`} />
                    {tab.label}
                    {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 p-2 mt-2">
                <button
                  onClick={() => { logout(); navigateTo('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#F8D548] to-[#DBB520] rounded-2xl flex items-center justify-center text-[#2A2A2A] text-2xl font-bold shadow-lg">
                        {user.firstName[0]}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-[#F8D548] text-[#2A2A2A] rounded-lg hover:bg-[#DBB520] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>{loading ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D548] focus:border-transparent transition-all focus:outline-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-100">
                          {user.firstName}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D548] focus:border-transparent transition-all focus:outline-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-100">
                          {user.lastName}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D548] focus:border-transparent transition-all focus:outline-none"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-100 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {user.email}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D548] focus:border-transparent transition-all focus:outline-none"
                          placeholder="+1 (555) 000-0000"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-100 flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-gray-400" />
                          {user.phone || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Login & Security</h2>
                  <p className="text-gray-500 mt-1">Manage your password and security preferences</p>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Update
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-[#DBB520]">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-[#2A2A2A] bg-[#F8D548]/20 rounded-lg hover:bg-[#F8D548]/30 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-gray-500 mt-1">Choose what updates you want to receive</p>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  {['Order updates', 'New product arrivals', 'Promotions and offers', 'Security alerts'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 2} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F8D548]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;