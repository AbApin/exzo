import FavouritesList from '../../components/favourites/FavouritesList';
import './favourites.css';

function Favourites() {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-[1395px] mx-auto px-5 2xl:px-0">
        <FavouritesList />
      </div>
    </div>
  );
}

export default Favourites;
