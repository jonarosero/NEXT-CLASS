/* eslint-disable prettier/prettier */
import { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      // Si no está, añádelo con una cantidad inicial de 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para obtener el total de productos en el carrito
  const getCartTotal = () =>
    cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);
