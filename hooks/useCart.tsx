import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-hot-toast";

type CartContextType = {
  cartProducts: CartProduct[] | null;
  cartTotalQty: number;
  cartTotalAmount: number;
  handleAddProductToCart: (product: CartProduct) => void;
  handleRemoveProductFromCart: (product: CartProduct) => void;
  handleCartQtyIncrease: (product: CartProduct) => void;
  handleCartQtyDecrease: (product: CartProduct) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("timelessWatchItems");
    const cProducts: CartProduct[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalAmount(parseFloat(total.toFixed(2)));
        setCartTotalQty(qty);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProduct) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to Cart");
      localStorage.setItem("timelessWatchItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProduct) => {
      if (cartProducts) {
        console.log("cartP", cartProducts, product);
        const filteredProducts = cartProducts?.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);
        localStorage.setItem(
          "timelessWatchItems",
          JSON.stringify(filteredProducts)
        );
        toast.success("Product removed");
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProduct) => {
      let updatedCart;

      if (product.quantity === 20) {
        return toast.error("Oops! Maximum reached.");
      }

      if (cartProducts) {
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        updatedCart = [...cartProducts];

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("timelessWatchItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProduct) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error("Oops! Minimum reached.");
      }

      if (cartProducts) {
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        updatedCart = [...cartProducts];

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("timelessWatchItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("timelessWatchItems", JSON.stringify(null));
    toast.success("Cart cleared");
  }, [cartProducts]);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    cartTotalAmount,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
