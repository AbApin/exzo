import { useGetAllCategoriesQuery } from '../../features/products/productsApi';
import { setCurrentCategory } from '../../pages/products/productsSlice';
import { useAppDispatch } from '../../hooks';

function Categories() {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка!</div>;

  return (
    <div className="categories">
      <h3 className="text-[#343434] font-black font-[raleway]  text-[18px] leading-[24px] uppercase pl-[20px]">
        popular categories
      </h3>
      <div className="h-[500px] overflow-auto mt-[20px]">
        {categories &&
          categories.map((category) => {
            return (
              <p
                key={category.slug}
                onClick={() => dispatch(setCurrentCategory(category.slug))}
                className="block text-[#888] font-[raleway] text-[11px] leading-[16px] font-bold uppercase border-b-[1px] border-[#f7f7f7] bg-white pt-[15px] pr-[46px] pb-[15px] pl-[20px] cursor-pointer transition-all duration-300 hover:text-">
                {category.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default Categories;
