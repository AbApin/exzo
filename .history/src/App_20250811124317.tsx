import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import { useEffect } from 'react';
import { fetchAllCartProducts, fetchAllFavoriteProducts } from './pages/products/productsSlice';
import Footer from './components/footer/Footer';
import { useAppDispatch } from './hooks';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const modal = location.state?.modal;

  const closeModal = () => {
    navigate(location.pathname, { replace: true, state: null });
    console.log('close');
  };

  useEffect(() => {
    dispatch(fetchAllFavoriteProducts());
    dispatch(fetchAllCartProducts());
  }, [dispatch]);

  return (
    <>
      <Header cl/>
      <main>
        <Outlet />
      </main>
      <Footer />

      {modal === 'login' && <Login onClose={closeModal} />}
      {modal === 'register' && <Register onClose={closeModal} />}
    </>
  );
}

export default App;
