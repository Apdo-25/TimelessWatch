import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { toast } from "react-hot-toast";

type CartContextType = {
    cartProducts: CartProduct[];
    cartTotalQty: number;
    handleAddProductToCart: (product: CartProduct) => void
}

export const CartContext = createContext<CartContextType | null>(null);

export interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('timelessWatchItems');
        const cProducts: CartProduct[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
        
    }, [])

    const handleAddProductToCart = useCallback((product: CartProduct) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev) {
                updatedCart = [...prev, product]
            }else {
                updatedCart = [product]
            }

            toast.success("Product added to Cart")
            localStorage.setItem('timelessWatchItems', JSON.stringify(updatedCart));

            return updatedCart
        })
    }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
    }

    return  (
        <CartContext.Provider value={value} {...props}/>
    )
    
}

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null ) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context
}
