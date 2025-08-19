import { Link, NavLink } from 'react-router';
import footerLogo from '../../assets/img/footerLogo.png';

function Footer() {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[60px] bg-[#343434]">
      <div className="max-w-[1355px] mx-auto px-[20px] 2xl:px-0">
        <div className="flex items-center justify-between">
          <Link to={'/'} className="footerLogo">
            <img src={footerLogo} alt="Logo" />
          </Link>
          <nav className="flex items-center gap-[30px]">
            <NavLink
              to="/"
              className="block text-[14px] text-white uppercase leading-[22px] transition duration-300 ease-in-out hover:text-[#b8cd06]">
              home
            </NavLink>
            <NavLink
              to="/products"
              className="block text-[14px] text-white uppercase leading-[22px] transition duration-300 ease-in-out hover:text-[#b8cd06]">
              products
            </NavLink>
          </nav>
        </div>
        <p className="block text-[14px] text-white uppercase leading-[22px] mt-[20px] text-center">
          © 2015 All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
