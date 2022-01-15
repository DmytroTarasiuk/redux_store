import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {

  const isCartShown = useSelector((state) => state.cart.isCartShown)
  const cart = useSelector((state) => state.cartContent)

  useEffect(() => {
    fetch('https://redux-store-30b70-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart)
    })
  }, [cart])

  return (
    <Layout>
      {isCartShown && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
