import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import { cartContext } from '../store/cart-context';

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  const dialog = useRef();
  const { items, updatedItem } = useContext(cartContext);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      id='modal'
      ref={dialog}
    >
      <h2>{title}</h2>
      <Cart
        items={items}
        onUpdateItemQuantity={updatedItem}
      />
      <form
        method='dialog'
        id='modal-actions'
      >
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
