import FavouritesList from '../../components/favourites/FavouritesList';
import './favourites.css';

function Favourites() {
  return (
    <div className="favourites">
      <div className="container">
        <div className="favouritesInner">
          <FavouritesList />
        </div>
      </div>
    </div>
  );
}

export default Favourites;
