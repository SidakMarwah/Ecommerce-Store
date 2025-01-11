"use client"

import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface CartContextType {
    cartProducts: string[];
    addProduct: (productId: string) => void;
    removeProduct: (productId: string) => void;
    clearCart: () => void;
    isProductInCart: (productId: string) => boolean;
    productCountInCart: (productId: string) => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
    children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;

    const [cartProducts, setCartProducts] = useState<string[]>([]);

    useEffect(() => {
        try {
            if (ls?.getItem("cart")) setCartProducts(JSON.parse(ls.getItem("cart") as string))
            else setCartProducts([]);
        } catch (error) {
            console.error("Failed to parse cart data from localStorage:", error);
            setCartProducts([]);
        }
    }, []);

    useEffect(() => {
        try {
            ls?.setItem("cart", JSON.stringify(cartProducts));
        } catch (error) {
            console.error("Failed to save cart data to localStorage:", error);
        }
    }, [cartProducts]);

    const addProduct = (productId: string) => {
        setCartProducts((prev) => [...prev, productId]);
    };

    const removeProduct = (productId: string) => {
        setCartProducts((prev) => prev.filter((id, index) => index !== prev.indexOf(productId)));
    };

    const clearCart = () => {
        setCartProducts([]);
    };

    const isProductInCart = (productId: string): boolean => {
        return cartProducts.includes(productId);
    };

    const productCountInCart = (productId: string): number => {
        return cartProducts.filter((id) => id === productId).length;
    };

    const contextValue = useMemo(
        () => ({
            cartProducts,
            addProduct,
            removeProduct,
            clearCart,
            isProductInCart,
            productCountInCart,
        }),
        [cartProducts]
    );

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
