import Categories from '../../components/categories/Categories';
import Filters from '../../components/filters/Filters';
import ProductList from '../../components/products/ProductList';
// import './products.css';

function Products() {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-[1210px] mx-auto px-5 2xl:px-0">
        <div className="flex justify-between items-start flex-col gap-[50px] md:gap-[50px] lg:gap-0">
          <div className="w-[25%]">
            <Categories />
          </div>
          <div className="w-[70%]">
            <Filters />
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
