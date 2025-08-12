import ProductSlider from '../../components/products/ProductsSlider';
function Home() {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-[1395px] mx-auto px-5 2xl:px-0">
        <ProductSlider />
      </div>
    </div>
  );
}

export default Home;
