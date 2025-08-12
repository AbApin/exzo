import { useGetAllCategoriesQuery } from '../../features/products/productsApi';
import './categories.css';
import { setCurrentCategory } from '../../pages/products/productsSlice';
import { useAppDispatch } from '../../hooks';

function Categories() {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка!</div>;

  return (
    <div className="categories">
      <h3 className="text-[#343434] font-black font-[raleway] uppercase pl-[]">popular categories</h3>
      <div className="categoriesList">
        {categories &&
          categories.map((category) => {
            return (
              <p
                key={category.slug}
                onClick={() => dispatch(setCurrentCategory(category.slug))}
                className="categoriesListItem">
                {category.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default Categories;
