import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])

    const addToCart = (product) => {
        setCart((prevCart) => {
          const isInCart = prevCart.find((item) => item._id === product._id);
          if (isInCart) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
      };

    const addToWishList = (product) => {
        if(!wishList.find((item) => item.id === product._id)){
            setWishList([...wishList, product])
        }
    }

    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      };

      const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item._id !== productId))
    }

    const removeFromWishList = (productId) => {
        setWishList(wishList.filter((item) => item._id !== productId))
    }

    return(
        <CartContext.Provider value={{cart, wishList, addToCart, addToWishList, removeFromCart, removeFromWishList, increaseQuantity, decreaseQuantity}}>

           {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)