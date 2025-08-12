import Categories from '../../components/categories/Categories';
import Filters from '../../components/filters/Filters';
import ProductList from '../../components/products/ProductList';
import './products.css';

function Products() {
  return (
    <div className="products max-w-lg">
      <div className="container1">
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
