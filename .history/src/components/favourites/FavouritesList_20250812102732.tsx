import FavouriteProduct from './FavouriteProduct';
import { useAppSelector } from '../../hooks';

function FavouritesList() {
  const favourites = useAppSelector((state) => state.products.favourites);

  if (!favourites) {
    return 'Loading...';
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[20px] p-2.5">
      {favourites.map((item) => {
        return <FavouriteProduct key={item.id} product={item} />;
      })}
    </div>
  );
}

export default FavouritesList;
