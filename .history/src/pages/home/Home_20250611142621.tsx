import ProductSlider from '../../components/products/ProductsSlider';
import './home.css';
function Home() {
  return (
    <div className="homePage">
      <div className="container">
        <div className="homePageInner">
          <ProductSlider />
        </div>
      </div>
    </div>
  );
}

export default Home;
