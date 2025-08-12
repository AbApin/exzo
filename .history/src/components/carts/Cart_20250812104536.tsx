import {
  cartCountMinus,
  cartCountPlus,
  removeCart,
  type CartType,
} from '../../pages/products/productsSlice';
import { useAppDispatch } from '../../hooks';

type Props = {
  cart: CartType;
};

function Cart({ cart }: Props) {
  const { id, thumbnail, title, price, count, discountPercentage } = cart;
  const discountPrice: number = Number((price - (price * discountPercentage) / 100).toFixed(2));
  const cartTotalPrice = (count * discountPrice).toFixed(2);

  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between py-[25px] px-[10px] border-b-[1px] border-[#eee]">
      <div className="flex items-center gap-[10px]">
        <div className="cartImg">
          <img src={thumbnail} className="block w-[85px] h-[85px] flex-shrink-0" alt={title} />
        </div>
        <p className="font-[raleway] font-black text-[#343434] text-[13px] leading-[18px] uppercase">
          {title}
        </p>
      </div>
      <div className="flex items-center justify-between gap-[30px] md:gap-[50px]">
        <p className="text-[#555] text-[14px] font-semibold leading-[22px] text-center uppercase">
          ${discountPrice}
        </p>
        <div className="flex items-center h-[42px] rounded-[21px] border-[1px] border-[#eee]">
          <span
            onClick={() => {
              if (count > 1) {
                dispatch(cartCountMinus({ cart }));
              }
            }}
            className="flex items-center justify-center ">
            -
          </span>
          <span className="cartCount">{count}</span>
          <span onClick={() => dispatch(cartCountPlus({ cart }))} className="cartQuantityPlus">
            +
          </span>
        </div>
        <p className="text-[#555] text-[14px] font-semibold leading-[22px] text-center uppercase">
          ${cartTotalPrice}
        </p>
        <button onClick={() => dispatch(removeCart({ id }))} className="cartRemoveBtn">
          <img src="../../../src/assets/img/cartRemove.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Cart;
