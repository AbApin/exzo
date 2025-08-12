import CartList from '../../components/carts/CartList';
import './carts.css';

function Carts() {
  return (
    <div className="carts">
      <div className="max-w-[1210px] mx-auto px-5 2xl:px-0">
        <div className="cartsInner">
          <div className="cartsText">
            <p className="cartsSub">shopping cart</p>
            <p className="cartsTitle">check your products</p>
          </div>
          <CartList />
        </div>
      </div>
    </div>
  );
}

export default Carts;
