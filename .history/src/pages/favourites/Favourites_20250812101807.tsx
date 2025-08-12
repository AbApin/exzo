import FavouritesList from '../../components/favourites/FavouritesList';
import './favourites.css';

function Favourites() {
  return (
    <div className="favourites">
      <div className="max-w-[1395px] mx-auto px-5 2xl:px-0">
        <div className="favouritesInner">
          <FavouritesList />
        </div>
      </div>
    </div>
  );
}

export default Favourites;
