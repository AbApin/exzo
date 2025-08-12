import { Link } from 'react-router';
import { useAppSelector } from '../../hooks';
import Cart from './Cart';

function CartList() {
  const carts = useAppSelector((state) => state.products.carts);
  const cartsTotalPrice = useAppSelector((state) => state.products.cartsProductsSum);
  return (
    <div className="flex fle">
      {carts.length === 0 ? (
        <div className="noCards">
          <p className="noCardsDescription">Cards empty,please add products</p>
          <Link to="/products" className="goTo">
            Go to Products
          </Link>
        </div>
      ) : (
        carts.map((cart) => {
          return <Cart key={cart.id} cart={cart} />;
        })
      )}
      {carts.length !== 0 && (
        <p className="cartsTotalPrice">
          cart total ` <span>${Number(cartsTotalPrice.toFixed(2))}</span>
        </p>
      )}
    </div>
  );
}

export default CartList;
