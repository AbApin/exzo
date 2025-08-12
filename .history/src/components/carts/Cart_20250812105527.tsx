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
            className="flex items-center justify-center text-black text-[20px] w-[50px] h-full border-r-[1px] border-[#eee] cursor-pointer rounded-[21px_0_0_21px] transition-all duration-150 hover:bg-[#b8cd06b0]">
            -
          </span>
          <span className="block text-[#888] text-[12px] text-center md:-[30px] lg:mx-[50px]">
            {count}
          </span>
          <span
            onClick={() => dispatch(cartCountPlus({ cart }))}
            className="flex items-center justify-center text-black text-[20px] w-[50px] h-full border-l-[1px] border-[#eee] cursor-pointer rounded-[0_21px_21px_0] transition-all duration-150 hover:bg-[#b8cd06b0]">
            +
          </span>
        </div>
        <p className="text-[#555] text-[14px] font-semibold leading-[22px] text-center uppercase">
          ${cartTotalPrice}
        </p>
        <button
          onClick={() => dispatch(removeCart({ id }))}
          className="flex items-center justify-center border-0 bg-transparent cursor-pointer w-[40px] h-[40px] relative
    before:content-['']
    before:absolute
    before:left-0
    before:top-0
    before:w-full
    before:h-full
    before:rounded-full
    before:scale-0
    before:pointer-events-none
    before:bg-black
    before:opacity-50
    hover:before:scale-[1.5]
    hover:before:opacity-0
    before:transition-transform
    before:duration-500
    hover:before:transition-opacity
    hover:before:duration-500">
          <img src="../../../src/assets/img/cartRemove.png" className="block" alt="delete" />
        </button>
      </div>
    </div>
  );
}

export default Cart;
