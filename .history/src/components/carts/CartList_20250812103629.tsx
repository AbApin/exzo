import { Link } from 'react-router';
import { useAppSelector } from '../../hooks';
import Cart from './Cart';

function CartList() {
  const carts = useAppSelector((state) => state.products.carts);
  const cartsTotalPrice = useAppSelector((state) => state.products.cartsProductsSum);
  return (
    <div className="flex flex-col mt-[30px]">
      {carts.length === 0 ? (
        <div className="flex items-center justify-center flex-col gap-[30px] h-[300px]">
          <p className="text-[40px] text-center italic tracking-[10px] w-full">
            Cards empty,please add products
          </p>
          <Link to="/products" className="inline-block text-white text-[18px] re">
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
