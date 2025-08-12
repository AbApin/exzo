import Categories from '../../components/categories/Categories';
import Filters from '../../components/filters/Filters';
import ProductList from '../../components/products/ProductList';
// import './products.css';

function Products() {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-[1395px] mx-auto px-5 2xl:px-0">
        <div className="productsInner">
          <div className="productsLeft">
            <Categories />
          </div>
          <div className="productsRight">
            <Filters />
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
