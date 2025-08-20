import { Link } from 'react-router';
import {
  addFavourite,
  addToCart,
  removeFavourite,
  type ProductType,
} from '../../pages/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';

const Product = ({ product }: { product: ProductType }) => {
  const { id, title, category, price, thumbnail, discountPercentage } = product;
  const discountPrice = (price - (price * discountPercentage) / 100).toFixed(2);
  const showVersion = useAppSelector((state) => state.products.showVersion);
  const favourites = useAppSelector((state) => state.products.favourites);
  const dispatch = useAppDispatch();
  const haveInFavourites = favourites.some((fav) => fav.id === id);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClickFavouriteIcon = (productId: string) => {
    if (!haveInFavourites && product && product.id) {
      dispatch(addFavourite({ product }));
    } else {
      dispatch(removeFavourite({ id: productId }));
    }
  };

  return (
    <div
      className={`flex ${
        showVersion === 'wrap' ? 'flex-col md:w-[33.333%]' : 'flex-row w-full'
      } w-full bg-white cursor-pointer border-[1px] border-[#f7f7f7] px-[30px] py-[25px] relative group`}
      onClick={() => setShowOverlay(!showOverlay)} // toggle overlay on mobile tap
    >
      {/* Product Info */}
      <div
        className={`${
          showVersion === 'wrap' ? 'order-0' : 'order-2'
        } font-[raleway] uppercase leading-[18px]`}>
        <p className="text-[#b8cd06] text-[11px]">{category}</p>
        <p className="text-[#343434] text-[13px] font-bold">{title}</p>
      </div>

      {/* Thumbnail + Overlay */}
      <div
        className={`${
          showVersion === 'wrap' ? 'order-0' : 'order-1'
        } w-[200px] h-[200px] mt-[10px] relative`}>
        <img src={thumbnail} alt={title} className="block w-full max-w-full m-auto" />
        <div
          className={`absolute top-0 left-0 w-full h-full items-center justify-center bg-[rgba(255,255,255,0.9)] transition-all duration-300 ${
            showOverlay ? 'flex' : 'hidden'
          } group-hover:flex`}>
          <div className="flex flex-col gap-[10px]">
            <Link
              to={`/products/${id}`}
              className="inline-block text-white font-[raleway] text-center text-[11px] leading-[18px] font-bold rounded-[25px] shadow-[logout] uppercase bg-[#343434] px-[20px] py-[10px]">
              Learn more
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent overlay toggle
                dispatch(addToCart({ product }));
              }}
              className="inline-block text-white font-[raleway] text-center text-[11px] leading-[18px] font-bold rounded-[25px] shadow-[logout] uppercase bg-[#b8cd06] border-0 px-[20px] py-[10px]">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Prices */}
      <div
        className={`${
          showVersion === 'wrap' ? 'order-0' : 'order-3'
        } flex items-center gap-[10px] mt-[10px] text-[16px] leading-[18px]`}>
        <p className="text-[#b8cd06]">${discountPrice}</p>
        <p className="text-[#888] line-through">${price}</p>
      </div>

      {/* Favourite Icon */}
      <div
        className={`flex items-center justify-center absolute right-[20px] top-[20px] p-1 border-[1px] border-[#555555] rounded-[50%] cursor-pointer transition-all duration-300 ${
          haveInFavourites ? 'bg-[#b8cd06]' : 'bg-transparent'
        }`}
        onClick={(e) => {
          e.stopPropagation(); // prevent overlay toggle
          handleClickFavouriteIcon(id);
        }}>
        <svg
          width="21"
          height="19"
          viewBox="0 0 21 19"
          className={`transition-colors duration-300 fill-[#555555] ${
            haveInFavourites || showOverlay ? 'fill-white' : ''
          }`}>
          <path d="M18.9614 6.15178C18.9614 5.54911 18.8814 5.01711 18.7215 4.5558C18.5615 4.09449 18.3569 3.72805 18.1076 3.45647C17.8584 3.18489 17.5552 2.96354 17.198 2.79241C16.8409 2.62128 16.4912 2.50595 16.1489 2.44643C15.8067 2.3869 15.4421 2.35714 15.0552 2.35714C14.6683 2.35714 14.2516 2.45201 13.8052 2.64174C13.3587 2.83147 12.9477 3.06957 12.5719 3.35603C12.1962 3.64248 11.8744 3.91034 11.6065 4.1596C11.3387 4.40885 11.1154 4.63765 10.9369 4.84598C10.8029 5.00967 10.6207 5.09152 10.39 5.09152C10.1593 5.09152 9.97705 5.00967 9.84312 4.84598C9.66455 4.63765 9.44134 4.40885 9.17348 4.1596C8.90562 3.91034 8.58382 3.64248 8.20808 3.35603C7.83234 3.06957 7.42125 2.83147 6.97482 2.64174C6.52839 2.45201 6.11173 2.35714 5.72482 2.35714C5.33792 2.35714 4.97333 2.3869 4.63107 2.44643C4.28881 2.50595 3.93911 2.62128 3.58196 2.79241C3.22482 2.96354 2.92162 3.18489 2.67237 3.45647C2.42311 3.72805 2.2185 4.09449 2.05853 4.5558C1.89856 5.01711 1.81857 5.54911 1.81857 6.15178C1.81857 7.40178 2.51426 8.72247 3.90562 10.1138L10.39 16.3638L16.8632 10.125C18.262 8.72619 18.9614 7.40178 18.9614 6.15178Z" />
        </svg>
      </div>
    </div>
  );
};

export default Product;
