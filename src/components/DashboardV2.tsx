import React, { useState, useEffect } from 'react';
import { Header } from './Header.tsx';
import { UserAvatar } from './UserAvatar';
import { Footer } from './Footer';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/Router';
import { User, ShoppingBag, Heart, Settings, LogOut, Home, Edit3, Save, X, Phone, Mail, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
    const { user, isAuthenticated, logout, updateProfile, isLoading } = useAuth();
    const { navigateTo } = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !user)) {
            navigateTo('/');
        }
    }, [isLoading, isAuthenticated, user, navigateTo]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
            <div className="w-12 h-12 border-4 border-[#F8D548] border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#f1f3f4]">
            <Header showCategories={false} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Navigation Controls */}
                <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#F8D548] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2 rounded-lg px-3 py-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <button
                        onClick={() => navigateTo('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#F8D548] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2 rounded-lg px-3 py-2"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </button>
                </div>

                {/* Welcome Section */}
                <div className="mb-10 relative overflow-hidden bg-[#F8D548] rounded-3xl p-8 md:p-12 shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 opacity-10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[#2A2A2A]">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                                Welcome back, {user.firstName}!
                            </h1>
                            <p className="text-[#2A2A2A]/90 text-lg max-w-xl leading-relaxed">
                                Track your sustainable journey, manage your orders, and explore new upcycled treasures.
                            </p>
                        </div>
                        <button
                            onClick={() => navigateTo('/products')}
                            className="px-8 py-4 bg-[#2A2A2A] text-[#F8D548] rounded-full font-bold hover:bg-[#2A2A2A]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#2A2A2A] focus:ring-offset-2 focus:ring-offset-[#F8D548]"
                        >
                            Explore New Arrivals
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Actions */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Home className="w-6 h-6 text-[#DBB520]" />
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { icon: ShoppingBag, label: 'Shop', path: '/products', color: 'bg-yellow-100 text-yellow-700' },
                                    { icon: Heart, label: 'Wishlist', path: '/membership', color: 'bg-red-100 text-red-700' },
                                    { icon: ShoppingBag, label: 'Cart', path: '/cart', color: 'bg-orange-100 text-orange-700' },
                                    { icon: Settings, label: 'Settings', path: '/profile', color: 'bg-blue-100 text-blue-700' },
                                ].map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => navigateTo(action.path)}
                                        className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#F8D548]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F8D548] focus:ring-offset-2"
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                            <action.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8D548]/10 flex items-center justify-center">
                                    <ShoppingBag className="w-8 h-8 text-[#DBB520]" />
                                </div>
                                <p className="text-gray-600 mb-2">No recent activity yet</p>
                                <p className="text-sm text-gray-500">Your orders and activities will appear here</p>
                                <button
                                    onClick={() => navigateTo('/products')}
                                    className="mt-4 px-6 py-2 bg-[#F8D548] text-[#2A2A2A] rounded-lg hover:bg-[#DBB520] transition-colors font-medium"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Account Information Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-[#F8D548]/5 p-6 border-b border-[#F8D548]/10 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#DBB520] flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    My Profile
                                </h3>
                                <button
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    className="p-2 hover:bg-white rounded-full transition-colors text-[#DBB520]"
                                >
                                    {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <UserAvatar
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        size="lg"
                                        className="rounded-2xl shadow-lg"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">{user.firstName} {user.lastName}</p>
                                        <p className="text-gray-500 text-sm">Member since {new Date().getFullYear()}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {isEditing ? (
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="bg-transparent w-full focus:outline-none text-gray-900"
                                                />
                                            ) : (
                                                <span>{user.email}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</label>
                                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {isEditing ? (
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="bg-transparent w-full focus:outline-none text-gray-900"
                                                    placeholder="Add phone number"
                                                />
                                            ) : (
                                                <span>{user.phone || 'Not provided'}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-2xl hover:from-red-100 hover:to-red-200 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-red-200"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
