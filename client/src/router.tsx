import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Products from './pages/products/Products';
import Home from './pages/home/Home';
import Carts from './pages/carts/Carts';
import ProductInfo from './components/products/ProductInfo';
import Favourites from './pages/favourites/Favourites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductInfo /> }, 
      { path: 'carts', element: <Carts /> },
      { path: 'favourites', element: <Favourites /> },
    ],
  },
]);

export default router;
