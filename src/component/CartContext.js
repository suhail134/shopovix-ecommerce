"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    //  const { id } = params;
    const [cart, setCart] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminSidebar, setAdminSidebar] = useState(false);
    const [navSidebar, setNavSidebar] = useState(false)
    const [results, setResults] = useState(null); // ye global state hai

    const deleteAllitems = (_id) => {
        setCart((prev) => prev.filter((p) => p._id !== _id));
    };



    const addToCart = (product) => {
        setCart((prev) => {
            const found = prev.find((item) => item._id === product._id);
            if (found) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // 👇 yaha sirf ek hi image string save kar raha hu
                return [
                    ...prev,
                    {
                        _id: product._id,
                        product_title: product.product_title,
                        product_price: product.product_price,
                        product_image: product.product_image?.[0]?.url || product.product_image,
                        quantity: 1,
                    },
                ];
            }
        });
        setSidebarOpen(true);
    };


    const removeFromCart = (_id) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item._id === _id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0) // agar quantity 0 ho gayi to cart se hata do
        );
    };


    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

    }, [])
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

    }, [cart])


    // ...existing code...
    return (
        <CartContext.Provider value={{ cart, addToCart, sidebarOpen, setNavSidebar, navSidebar, adminSidebar, setAdminSidebar, setSidebarOpen, removeFromCart, deleteAllitems, results, setResults }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
