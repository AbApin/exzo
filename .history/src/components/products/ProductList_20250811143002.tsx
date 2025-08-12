import Product from './Product';
import { useAppSelector } from '../../hooks';
import { useGetAllProductsQuery } from '../../features/products/productsApi';
import type { ProductType } from '../../pages/products/productsSlice';

function ProductList() {
  const limit = useAppSelector((state) => state.products.limit);
  const showVersion = useAppSelector((state) => state.products.showVersion);
  const currentCategory = useAppSelector((state) => state.products.currentCategory);

  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductsQuery({ category: currentCategory, limit });

  if (isLoading) return <p>Загрузка товаров...</p>;
  if (error) return <p>Ошибка при загрузке товаров</p>;

  return (
    <div
      className={`flex mt-[20px] ${
        showVersion === 'wrap' ? 'productList flex-wrap' : 'productList flex-col'
      }`}>
      {products &&
        products.map((product: ProductType) => {
          return <Product key={product.id} product={product} />;
        })}
    </div>
  );
}

export default ProductList;
