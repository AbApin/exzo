import CartList from '../../components/carts/CartList';
import './carts.css';

function Carts() {
  return (
    <div className="carts">
      <div className="container1">
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
