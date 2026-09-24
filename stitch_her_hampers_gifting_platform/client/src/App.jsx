import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Occasions from './pages/Occasions';
import Quiz from './pages/Quiz';
import Shop from './pages/Shop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="occasions" element={<Occasions />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
