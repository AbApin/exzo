import FavouriteProduct from './FavouriteProduct';
import {useAppSelector } from '../../hooks';

function FavouritesList() {
  const favourites = useAppSelector((state) => state.products.favourites);

  if (!favourites) {
    return 'Loading...';
  }

  return (
    <div className="favouritesList">
      {favourites.map((item) => {
        return <FavouriteProduct key={item.id} product={item} />;
      })}
    </div>
  );
}

export default FavouritesList;
