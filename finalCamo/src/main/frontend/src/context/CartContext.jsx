import React, { createContext, useState,useContext,useEffect } from 'react';


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    let cartItemId = 0;  // 각 항목에 할당할 고유한 cartItemId
  
    const addToCart = (product, quantity) => {
      const newCartItem = { id: cartItemId++, product, quantity };  // cartItemId 할당
      setCart(prevCart => [...prevCart, newCartItem]);
    };
  
    const setQuantity = (cartItemId, quantity) => {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    };
   
    const removeFromCart = (cartItemId) => {
      setCart(prevCart =>
        prevCart.filter(item => item.id !== cartItemId)
      );
    };
  
  

  
  
  return (
    <CartContext.Provider value={{ setCart,cart, addToCart,setQuantity,removeFromCart,selectedItems, setSelectedItems }}>
      {children}
    </CartContext.Provider>
  );  
  };
export const useCart = () => useContext(CartContext);
export default CartProvider;