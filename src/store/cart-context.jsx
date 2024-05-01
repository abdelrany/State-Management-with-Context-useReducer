import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

export const cartContext = createContext({
  items: [],
  cartQuantity: 0,
  addItem: () => {},
  updatedItem: () => {},
});
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.id
        );
        updatedItems.push({
          id: action.payload.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    }
    case 'UPDATE_ITEM': {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
  }
}

const initialState = {
  items: [],
};
export function CartProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    reducer,
    initialState
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id,
      },
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
  }

  const value = {
    items: shoppingCartState.items,
    cartQuantity: shoppingCartState.items.length,
    addItem: handleAddItemToCart,
    updatedItem: handleUpdateCartItemQuantity,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
