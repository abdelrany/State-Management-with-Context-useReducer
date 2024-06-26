import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { CartProvider } from './store/cart-context.jsx';

function App() {
  return (
    <CartProvider>
      <Header />
      <Shop />
    </CartProvider>
  );
}

export default App;
