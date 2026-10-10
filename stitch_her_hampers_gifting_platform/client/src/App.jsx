import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Occasions from './pages/Occasions';
import Quiz from './pages/Quiz';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="occasions" element={<Occasions />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
