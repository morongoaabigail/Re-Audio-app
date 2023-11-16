import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [key, SetKey]=useState(null);
    return (
        <CartContext.Provider value={{
            key, SetKey
        }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };


