import ProductSlider from '../../components/products/ProductsSlider';
import './home.css';
function Home() {
  return (
    <div className="md:py-[50px] md:py-[50px]">
      <div className="container">
        <div className="homePageInner">
          <ProductSlider />
        </div>
      </div>
    </div>
  );
}

export default Home;
