import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link, NavLink, useLocation } from 'react-router';
import { useAuth } from '../../features/user/useAuth';
import { removeUser } from '../../features/user/userSlice';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const cartsProductsCount = useAppSelector((state) => state.products.cartsProductsCount);
  const cartsProductsSum = useAppSelector((state) => state.products.cartsProductsSum);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuth, email, isLoading } = useAuth();

  const signOutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header>
      <div className="border-b-[1px] border-[#eee]">
        <div className="max-w-[1395px] mx-auto px-5 2xl:px-0">
          <div className="flex justify-between lg:border-x-[50px] border-[transparent]">
            <div className="lg:flex items-center hidden">
              <p className="inline-block border-x-[1px] border-[#eee] ml-[-1px] p-[20px] px-[25px] text-[10px] leading-[20px] text-[#888] uppercase relative">
                <b className="text-[#555] font-[raleway]">contact us:</b>
                <a className="text-[#888]" href="tel:+3 (523) 555 123 8745">
                  +3 (523) 555 123 8745
                </a>
              </p>
              <p className="inline-block border-x-[1px] border-[#eee] ml-[-1px] p-[20px] px-[25px] text-[10px] leading-[20px] text-[#888] uppercase relative">
                <b className="text-[#555] font-[raleway]">email:</b>
                <a className="text-[#888]" href="mailto:office@exzo.com">
                  office@exzo.com
                </a>
              </p>
            </div>
            <div className="flex w-full lg:w-auto">
              <>
                {isAuth && !isLoading && (
                  <div className="md:flex-row flex flex-col items-center gap-2.5 font-[raleway] font-normal uppercase p-2.5 border-l-[1px] border-[#eee] text-[#555] text-[11px] leading-[16px]">
                    <p className="font-[raleway] font-normal lowercase">{email}</p>
                    <button
                      className="inline-block text-white font-bold uppercase p-2.5 rounded-2xl bg-[#b8cd06] shadow-[logout] border-0 cursor-pointer transition duration-300 ease-in-out"
                      onClick={signOutHandler}>
                      logout
                    </button>
                  </div>
                )}
                {!isAuth && !isLoading && (
                  <div className="flex items-center gap-2.5 font-[raleway] font-normal uppercase p-2.5 border-l-[1px] border-[#eee] text-[#555] text-[11px] leading-[16px]">
                    <Link
                      className="transition duration-300 ease-in-out font-bold text-[#555] hover:text-[#b8cd06]"
                      to={location.pathname}
                      state={{ modal: 'login' }}>
                      login
                    </Link>
                    or
                    <Link
                      className="transition duration-300 ease-in-out font-bold text-[#555] hover:text-[#b8cd06]"
                      to={location.pathname}
                      state={{ modal: 'register' }}>
                      register
                    </Link>
                  </div>
                )}
              </>
              <Link to="/favourites" className="favouriteIcon">
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none">
                  <path
                    d="M18.9614 6.15178C18.9614 5.54911 18.8814 5.01711 18.7215 4.5558C18.5615 4.09449 18.3569 3.72805 18.1076 3.45647C17.8584 3.18489 17.5552 2.96354 17.198 2.79241C16.8409 2.62128 16.4912 2.50595 16.1489 2.44643C15.8067 2.3869 15.4421 2.35714 15.0552 2.35714C14.6683 2.35714 14.2516 2.45201 13.8052 2.64174C13.3587 2.83147 12.9477 3.06957 12.5719 3.35603C12.1962 3.64248 11.8744 3.91034 11.6065 4.1596C11.3387 4.40885 11.1154 4.63765 10.9369 4.84598C10.8029 5.00967 10.6207 5.09152 10.39 5.09152C10.1593 5.09152 9.97705 5.00967 9.84312 4.84598C9.66455 4.63765 9.44134 4.40885 9.17348 4.1596C8.90562 3.91034 8.58382 3.64248 8.20808 3.35603C7.83234 3.06957 7.42125 2.83147 6.97482 2.64174C6.52839 2.45201 6.11173 2.35714 5.72482 2.35714C5.33792 2.35714 4.97333 2.3869 4.63107 2.44643C4.28881 2.50595 3.93911 2.62128 3.58196 2.79241C3.22482 2.96354 2.92162 3.18489 2.67237 3.45647C2.42311 3.72805 2.2185 4.09449 2.05853 4.5558C1.89856 5.01711 1.81857 5.54911 1.81857 6.15178C1.81857 7.40178 2.51426 8.72247 3.90562 10.1138L10.39 16.3638L16.8632 10.125C18.262 8.72619 18.9614 7.40178 18.9614 6.15178ZM20.39 6.15178C20.39 7.79613 19.5381 9.47024 17.8342 11.1741L10.8811 17.8705C10.7471 18.0045 10.5835 18.0714 10.39 18.0714C10.1965 18.0714 10.0329 18.0045 9.89893 17.8705L2.93464 11.1518C2.86024 11.0923 2.75793 10.9955 2.62772 10.8616C2.49751 10.7277 2.29104 10.484 2.0083 10.1306C1.72556 9.77716 1.47259 9.41443 1.24937 9.04241C1.02616 8.67039 0.827127 8.22024 0.652276 7.69196C0.477425 7.16369 0.389999 6.6503 0.389999 6.15178C0.389999 4.51488 0.86247 3.23512 1.80741 2.3125C2.75235 1.38988 4.05815 0.92857 5.72482 0.92857C6.18613 0.92857 6.65674 1.00855 7.13665 1.16853C7.61656 1.3285 8.06299 1.54427 8.47594 1.81585C8.88888 2.08742 9.24417 2.34226 9.54179 2.58036C9.8394 2.81845 10.1221 3.07143 10.39 3.33928C10.6579 3.07143 10.9406 2.81845 11.2382 2.58036C11.5358 2.34226 11.8911 2.08742 12.3041 1.81585C12.717 1.54427 13.1634 1.3285 13.6433 1.16853C14.1233 1.00855 14.5939 0.92857 15.0552 0.92857C16.7218 0.92857 18.0276 1.38988 18.9726 2.3125C19.9175 3.23512 20.39 4.51488 20.39 6.15178Z"
                    fill="#555555"
                  />
                </svg>
              </Link>
              <div className="flex items-center gap-2.5 border-x-[1px] border-[#eee] px-[25px] py-[20px] ml-auto lg:ml-0">
                <div className="relative">
                  <Link to={'/carts'} className="bagIcon">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                      <path
                        d="M19.7394 16.2143L20.13 19.7076C20.1523 19.9159 20.0928 20.1019 19.9514 20.2656C19.8101 20.4219 19.6315 20.5 19.4157 20.5H0.844279C0.628505 20.5 0.449933 20.4219 0.308564 20.2656C0.167195 20.1019 0.107672 19.9159 0.129993 19.7076L0.520618 16.2143H19.7394ZM18.7014 6.85045L19.6612 15.5H0.598743L1.55856 6.85045C1.58089 6.67188 1.65901 6.5212 1.79294 6.39844C1.92687 6.27567 2.08684 6.21428 2.27285 6.21428H5.12999V7.64286C5.12999 8.0372 5.2695 8.37388 5.54852 8.6529C5.82754 8.93192 6.16422 9.07143 6.55856 9.07143C6.95291 9.07143 7.28959 8.93192 7.56861 8.6529C7.84763 8.37388 7.98714 8.0372 7.98714 7.64286V6.21428H12.2729V7.64286C12.2729 8.0372 12.4124 8.37388 12.6914 8.6529C12.9704 8.93192 13.3071 9.07143 13.7014 9.07143C14.0958 9.07143 14.4324 8.93192 14.7115 8.6529C14.9905 8.37388 15.13 8.0372 15.13 7.64286V6.21428H17.9871C18.1731 6.21428 18.3331 6.27567 18.467 6.39844C18.601 6.5212 18.6791 6.67188 18.7014 6.85045ZM14.4157 4.78571V7.64286C14.4157 7.83631 14.345 8.00372 14.2037 8.14509C14.0623 8.28646 13.8949 8.35714 13.7014 8.35714C13.508 8.35714 13.3406 8.28646 13.1992 8.14509C13.0578 8.00372 12.9871 7.83631 12.9871 7.64286V4.78571C12.9871 3.99702 12.7081 3.32366 12.1501 2.76562C11.592 2.20759 10.9187 1.92857 10.13 1.92857C9.3413 1.92857 8.66794 2.20759 8.1099 2.76562C7.55187 3.32366 7.27285 3.99702 7.27285 4.78571V7.64286C7.27285 7.83631 7.20217 8.00372 7.0608 8.14509C6.91943 8.28646 6.75202 8.35714 6.55856 8.35714C6.36511 8.35714 6.1977 8.28646 6.05633 8.14509C5.91496 8.00372 5.84428 7.83631 5.84428 7.64286V4.78571C5.84428 3.60268 6.26281 2.59263 7.09986 1.75558C7.93691 0.918526 8.94696 0.5 10.13 0.5C11.313 0.5 12.3231 0.918526 13.1601 1.75558C13.9972 2.59263 14.4157 3.60268 14.4157 4.78571Z"
                        fill="#555555"
                      />
                    </svg>
                  </Link>
                  <p className="absolute right-[-12px] top-[-10px] w-[20px] h-[20px] rounded-[50%] bg-[#b8cd06] text-white text-[11px] leading-[20px] text-center shadow-[logout]">
                    {cartsProductsCount}
                  </p>
                </div>
                <p className="text-[13px] text-[#b8cd06]">${cartsProductsSum.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-[#eee] py-[20px]">
        <div className="max-w-[1395px] mx-auto px-5 2xl:px-0">
          <div className="flex items-center justify-between">
            <Link to="/" className="headerLogo">
              <img className="block max-w-full" src="../../../src/assets/img/logo.png" alt="" />
            </Link>
            <nav className="flex items-center gap-5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-[11px] leading-[16px] font-bold uppercase px-5 py-[9px] rounded-[16px] transition-all duration-300 bg-[#b8cd06] shadow-[1px_1px_2px_rgba(0,0,0,0.1)] text-white'
                    : 'block text-[11px] leading-[16px] text-[#343434] font-bold uppercase px-5 py-[9px] rounded-[16px] transition-all duration-300'
                }>
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-[11px] leading-[16px] font-bold uppercase md:px-5 md:py-[9px] rounded-[16px] transition-all duration-300 bg-[#b8cd06] shadow-[1px_1px_2px_rgba(0,0,0,0.1)] text-white'
                    : 'block text-[11px] leading-[16px] text-[#343434] font-bold uppercase md:px-5 md:py-[9px] rounded-[16px] transition-all duration-300'
                }>
                Products
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
