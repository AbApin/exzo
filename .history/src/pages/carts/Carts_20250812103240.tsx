import CartList from '../../components/carts/CartList';

function Carts() {
  return (
    <div className="py-[30px] md:py-[50px] lg:py-[100px]">
      <div className="max-w-[1210px] mx-auto px-5 2xl:px-0">
        <div className="cartsText">
          <p className="text-[#555] text-[14px] leading-[22px] uppercase text-center mt-[5px]">
            shopping cart
          </p>
          <p className="text-[#343434] text-[14px] leading-[22px] uppercase text-center mt-[5px]">check your products</p>
        </div>
        <CartList />
      </div>
    </div>
  );
}

export default Carts;
