import { useContext, useRef } from 'react';

import CartModal from './CartModal.jsx';
import { cartContext } from '../store/cart-context.jsx';

export default function Header() {
  const modal = useRef();

  const { items, updatedItem, cartQuantity } = useContext(cartContext);

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        cartItems={items}
        onUpdateCartItemQuantity={updatedItem}
        title='Your Cart'
        actions={modalActions}
      />
      <header id='main-header'>
        <div id='main-title'>
          <img
            src='logo.png'
            alt='Elegant model'
          />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
