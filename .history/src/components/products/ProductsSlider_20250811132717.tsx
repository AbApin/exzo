import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import { addToCart } from '../../pages/products/productsSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetAllProductsQuery } from '../../features/products/productsApi';

const ProductSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const category = useAppSelector((state) => state.products.currentCategory);
  const limit = useAppSelector((state) => state.products.limit);
  const { data: products, isLoading } = useGetAllProductsQuery({
    category: category || 'smartphones',
    limit: limit || 15,
  });
  const product = products?.[0];
  const dispatch = useAppDispatch();

  if (!product || isLoading) {
    return 'Loading...';
  }

  const discountPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="flex justify-between items-center">
      <div className="w-[40%]">
        <p className="text-[#555] text-[18px] leading-[24px]">
          BEST PRICE <span className="text-[#b8cd06]">${discountPrice}</span>
        </p>
        <h2 className="font-[raleway] text-[#343434] text-[70px] leading-none font-black uppercase mt-5">
          {product.title}
        </h2>
        <p className="text-[#555] text-[18px] leading-[24px] mt-[10px]">{product.description}</p>
        <div className="flex items-center gap-[20px] w-[48%]">
          <Link to={`/products/${product.id}`} className="learnMore">
            Learn more
          </Link>
          <button
            type="button"
            onClick={() => dispatch(addToCart({ product }))}
            className="addToCart">
            Add to cart
          </button>
        </div>
      </div>
      <div className="sliderImgs">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="w-[50%] h-auto">
          {product &&
            product.images.map((img, i) => (
              <SwiperSlide className="flex items-center justify-center" key={i}>
                <img
                  className="block w-full h-auto object-cover rounded-[8px]"
                  src={img}
                  alt={`Product ${i}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          direction="vertical"
          className="w-[100px]">
          {product &&
            product.images.map((img, i) => (
              <SwiperSlide className='flex items-center justify-center w-[100px] h-' key={i}>
                <img src={img} alt={`Thumb ${i}`} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
