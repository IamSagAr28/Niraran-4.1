import React, { useState } from 'react';
import { Header } from './Header.tsx';
import { Footer } from './Footer';
import { useRouter } from '../utils/Router';
import '../styles/CartPage.css';

export default function CartPage() {
    const { navigateTo } = useRouter();
    // Mock cart data
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Eco-Friendly Cushion Cover',
            variant: 'Color: Red / Size: Small',
            price: 120,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
        },
        {
            id: 2,
            name: 'Bottle Cover',
            variant: 'Color: Blue',
            price: 80,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1583847268991-ba48f0e69f7f?w=200'
        }
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="cart-page-container">
            <Header showCategories={false} />

            <main className="container cart-page">
                <h1 className="cart-title">Your Cart</h1>
                
                <div className="cart-grid">
                    {/* Cart Items */}
                    <div className="cart-items-container">
                        <div className="cart-header-row">
                            <div>Product</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Total</div>
                        </div>

                        {cartItems.map(item => (
                            <div className="cart-item-row" key={item.id}>
                                <div className="product-col">
                                    <img src={item.image} alt={item.name} className="cart-img" />
                                    <div className="product-details">
                                        <h3>{item.name}</h3>
                                        <p className="product-variant">{item.variant}</p>
                                        <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                                    </div>
                                </div>
                                <div className="price-col">Rs. {item.price.toFixed(2)}</div>
                                <div className="quantity-col">
                                    <div className="quantity-input">
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                                        <input type="text" value={item.quantity} readOnly className="qty-val" />
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <div className="total-col">Rs. {(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}

                        {cartItems.length === 0 && (
                            <div style={{textAlign: 'center', padding: '40px'}}>
                                <p>Your cart is empty.</p>
                                <button 
                                    onClick={() => navigateTo('/')} 
                                    style={{color: 'var(--accent)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit'}}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>Rs. {subtotal.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={() => alert('Proceeding to checkout...')}>Proceed to Checkout</button>
                        <button 
                            onClick={() => navigateTo('/')} 
                            className="continue-shopping"
                            style={{background: 'none', border: 'none', cursor: 'pointer', width: '100%'}}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
