import { addFavourite, addToCart, removeFavourite } from '../../pages/products/productsSlice';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetSimpleProductQuery } from '../../features/products/productsApi';

const ProductInfo = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSimpleProductQuery(id!, { skip: !id });
  const favourites = useAppSelector((state) => state.products.favourites);
  const haveInFavourites = favourites.some((fav) => fav.id === id);

  const dispatch = useAppDispatch();

  const handleClickFavouriteIcon = () => {
    if (!haveInFavourites && product && product.id) {
      dispatch(addFavourite({ product }));
    } else {
      dispatch(removeFavourite({ id: id! }));
    }
  };

  useEffect(() => {
    if (product && (product.thumbnail || product.images?.length > 0)) {
      setSelectedImage(product.thumbnail ?? product.images[0]);
    }
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const discountPrice =
    product && (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка!</div>;
.products {
  padding: 100px 0;
}
.productsInner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.productsLeft {
  width: 25%;
}
.productsRight {
  width: 70%;
}
.productList {
  display: flex;
  margin-top: 20px;
}
.productList.wrap {
  flex-wrap: wrap;
}
.productList.column {
  flex-direction: column;
}
.product {
  display: flex;
  background: #fff;
  cursor: pointer;
  border: 1px #f7f7f7 solid;
  padding: 25px 30px 25px 30px;
  position: relative;
}
.product.wrap {
  flex-direction: column;
  width: 33.333%;
}
.product.column {
  width: 100%;
}
.product.column .productImg {
  order: 1;
}
.product.column .productTopSubs {
  order: 2;
}
.product.column .productPrices {
  order: 3;
}
.productFavoriteIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 1px solid #555555;
  padding: 5px;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}
.productFavoriteIcon:hover,
.productFavoriteIcon.active {
  background: #b8cd06;
  border-color: #b8cd06;
}
.productFavoriteIcon:hover svg path,
.productFavoriteIcon.active svg path {
  fill: #fff;
}
.categoryName {
  color: #b8cd06;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 18px;
}
.productTitle {
  color: #343434;
  font-weight: 900;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 18px;
}
.productImg {
  width: 200px;
  height: 200px;
  margin-top: 10px;
  position: relative;
}
.productImg img {
  display: block;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
}
.productPrices {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.discountPrice {
  color: #b8cd06;
  font-size: 16px;
  line-height: 18px;
}
.productPrice {
  color: #888;
  font-size: 16px;
  line-height: 18px;
  text-decoration: line-through;
}
.productLayer {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  animation: fadeIn 0.3s;
  transition: all 0.3s;
}
.product:hover .productLayer {
  display: flex;
}
.productBtns {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.learnMore {
  display: inline-block;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  text-align: center;
  font-size: 11px;
  line-height: 18px;
  border-radius: 25px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-weight: 700;
  background: #343434;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.learnMore:hover {
  box-shadow: 0 0 10px #343434;
}
.addToCart {
  display: inline-block;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  text-align: center;
  font-size: 11px;
  line-height: 18px;
  border-radius: 25px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-weight: 700;
  background: #b8cd06;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.addToCart:hover {
  box-shadow: 0 0 10px #b8cd06;
}

/* productInfo */
.productPage {
  padding: 100px 0;
}
.productPageInner {
  display: flex;
  justify-content: space-between;
}
.productPageLeft {
  width: 50%;
}
.productPageMainImg {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.productPageMainImg img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
}
.productPageBottomImgs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.productPageBottomImg {
  width: 30%;
  cursor: pointer;
  transition: all 0.3s;
}
.productPageBottomImg:hover img {
  transform: scale(1.1);
}
.productPageBottomImg img {
  display: block;
  width: 100px;
  margin: 0 auto;
  transition: all 0.3s;
}
.productPageRight {
  width: 50%;
}
.productPageCategory {
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-transform: uppercase;
}
.productPageTitle {
  font-size: 30px;
  line-height: 34px;
  color: #343434;
  font-weight: 900;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
}
.productPagePriceContainer {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 20px;
}
.productPagePrice {
  font-size: 18px;
  line-height: 24px;
  color: #555;
  text-transform: uppercase;
}
.productPagePrice span {
  color: #b8cd06;
}
.productReviews {
  color: #888;
  font-size: 13px;
  line-height: 20px;
}
.productPageAvailabilityStatus {
  color: #888;
  font-size: 14px;
  line-height: 22px;
  margin-top: 20px;
  text-transform: uppercase;
}
.productPageDesc {
  color: #888;
  font-size: 14px;
  line-height: 22px;
  margin-top: 20px;
}
.productPageBtns {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
}
.productPageFavoriteIcon {
  display: block;
  position: relative;
}
.productPageFavoriteIcon .productFavoriteIcon {
  position: static;
}

/* productsSlider */
.sliderWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sliderText {
  width: 40%;
}
.sliderProductPrice {
  color: #555;
  font-size: 18px;
  line-height: 24px;
}
.sliderProductPrice span {
  color: #b8cd06;
}
.sliderProductTitle {
  font-size: 70px;
  line-height: 70px;
  color: #343434;
  font-weight: 900;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  margin-top: 20px;
}
.sliderProductDescription {
  color: #555;
  font-size: 18px;
  line-height: 24px;
  margin-top: 10px;
}
.sliderProductBtns {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.sliderImgs {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 48%;
}
.mainSlider {
  width: 50%;
  height: auto;
}
.mainSlider .swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mainSlider img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}
.thumbsSlider {
  width: 100px;
}
.thumbsSlider .swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px !important;
  padding: 10px;
  border-radius: 50%;
  border: 1px #eee solid;
  cursor: pointer;
  transition: all 0.3s;
}
.thumbsSlider .swiper-slide:hover {
  border-color: #b8cd06;
}
.thumbsSlider .swiper-slide.swiper-slide-thumb-active {
  border-color: #b8cd06;
  background: #b8cd06;
}
.thumbsSlider .swiper-slide img {
  display: block;
  max-width: 100%;
  width: auto !important;
}

  return (
    product && (
      <div className="productPage">
        <div className="container1">
          <div className="productPageInner">
            <div className="productPageLeft">
              <div className="productPageMainImg">
                <img src={selectedImage} alt="" />
              </div>
              <div className="productPageBottomImgs">
                {product.images.map((image) => {
                  return (
                    <div key={image} className="productPageBottomImg">
                      <img src={image} alt="" onClick={() => setSelectedImage(image)} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="productPageRight">
              <p className="productPageCategory">{product.category}</p>
              <p className="productPageTitle">{product.title}</p>
              <div className="productPagePriceContainer">
                <p className="productPagePrice">
                  PRICE: <span>${discountPrice}</span>
                </p>
                <p className="productReviews">
                  {product.reviews ? product.reviews.length : 0} Reviews
                </p>
              </div>
              <p className="productPageAvailabilityStatus">
                AVAILABLE: {product.availabilityStatus}
              </p>
              <p className="productPageDesc">{product.description}</p>
              <div className="productPageBtns">
                <button onClick={() => dispatch(addToCart({ product }))} className="addToCart">
                  Add to cart
                </button>
                <div className="productPageFavoriteIcon" onClick={() => handleClickFavouriteIcon()}>
                  <div
                    className={
                      haveInFavourites ? 'productFavoriteIcon active' : 'productFavoriteIcon'
                    }>
                    <svg width="21" height="19" viewBox="0 0 21 19" fill="#000">
                      <path
                        d="M18.9614 6.15178C18.9614 5.54911 18.8814 5.01711 18.7215 4.5558C18.5615 4.09449 18.3569 3.72805 18.1076 3.45647C17.8584 3.18489 17.5552 2.96354 17.198 2.79241C16.8409 2.62128 16.4912 2.50595 16.1489 2.44643C15.8067 2.3869 15.4421 2.35714 15.0552 2.35714C14.6683 2.35714 14.2516 2.45201 13.8052 2.64174C13.3587 2.83147 12.9477 3.06957 12.5719 3.35603C12.1962 3.64248 11.8744 3.91034 11.6065 4.1596C11.3387 4.40885 11.1154 4.63765 10.9369 4.84598C10.8029 5.00967 10.6207 5.09152 10.39 5.09152C10.1593 5.09152 9.97705 5.00967 9.84312 4.84598C9.66455 4.63765 9.44134 4.40885 9.17348 4.1596C8.90562 3.91034 8.58382 3.64248 8.20808 3.35603C7.83234 3.06957 7.42125 2.83147 6.97482 2.64174C6.52839 2.45201 6.11173 2.35714 5.72482 2.35714C5.33792 2.35714 4.97333 2.3869 4.63107 2.44643C4.28881 2.50595 3.93911 2.62128 3.58196 2.79241C3.22482 2.96354 2.92162 3.18489 2.67237 3.45647C2.42311 3.72805 2.2185 4.09449 2.05853 4.5558C1.89856 5.01711 1.81857 5.54911 1.81857 6.15178C1.81857 7.40178 2.51426 8.72247 3.90562 10.1138L10.39 16.3638L16.8632 10.125C18.262 8.72619 18.9614 7.40178 18.9614 6.15178ZM20.39 6.15178C20.39 7.79613 19.5381 9.47024 17.8342 11.1741L10.8811 17.8705C10.7471 18.0045 10.5835 18.0714 10.39 18.0714C10.1965 18.0714 10.0329 18.0045 9.89893 17.8705L2.93464 11.1518C2.86024 11.0923 2.75793 10.9955 2.62772 10.8616C2.49751 10.7277 2.29104 10.484 2.0083 10.1306C1.72556 9.77716 1.47259 9.41443 1.24937 9.04241C1.02616 8.67039 0.827127 8.22024 0.652276 7.69196C0.477425 7.16369 0.389999 6.6503 0.389999 6.15178C0.389999 4.51488 0.86247 3.23512 1.80741 2.3125C2.75235 1.38988 4.05815 0.92857 5.72482 0.92857C6.18613 0.92857 6.65674 1.00855 7.13665 1.16853C7.61656 1.3285 8.06299 1.54427 8.47594 1.81585C8.88888 2.08742 9.24417 2.34226 9.54179 2.58036C9.8394 2.81845 10.1221 3.07143 10.39 3.33928C10.6579 3.07143 10.9406 2.81845 11.2382 2.58036C11.5358 2.34226 11.8911 2.08742 12.3041 1.81585C12.717 1.54427 13.1634 1.3285 13.6433 1.16853C14.1233 1.00855 14.5939 0.92857 15.0552 0.92857C16.7218 0.92857 18.0276 1.38988 18.9726 2.3125C19.9175 3.23512 20.39 4.51488 20.39 6.15178Z"
                        fill="#555555"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductInfo;
