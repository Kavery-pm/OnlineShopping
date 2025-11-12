import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";


export const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  updateItem: (id) => {},
//   clearCart: () => {},
});

export const ShoppingCartReducer=(state,action) => {
    
  switch (action.type) {
    case 'ADD': {
        const id = action.id;
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
  
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const product = DUMMY_PRODUCTS.find((product) => product.id === id);
          updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });                       
    }
    return {items: updatedItems,
    };
}
case 'UPDATE': {
    const id = action.id;
    const amount = action.amount;
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === id
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
}
    
    default:
      return state;
  }
}

export default function CartContextProvider({ children }) {
const [shoppingCartState, dispatch]=useReducer(ShoppingCartReducer, {items: [], totalAmount: 0});
 const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    dispatch({type: 'ADD', id: id});
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    dispatch({type: 'UPDATE', id: productId, amount: amount});
  }
const ctxValue={
    items: shoppingCartState.items,
    addItem: handleAddItemToCart,
    updateItem: handleUpdateCartItemQuantity,
    totalAmount: 0,
};
  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}