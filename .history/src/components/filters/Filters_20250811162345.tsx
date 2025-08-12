import './filters.css';
import { changeShowVersion, setCurrentLimit } from '../../pages/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetTotalProductsByCategoryQuery } from '../../features/products/productsApi';
import { useEffect, useState } from 'react';

export default function Filters() {
  const limit = useAppSelector((state) => state.products.limit);
  const showVersion = useAppSelector((state) => state.products.showVersion);
  const filtersCategoryName = useAppSelector((state) => state.products.currentCategory);
  const { data: total } = useGetTotalProductsByCategoryQuery(filtersCategoryName);
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 767);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="filters">
      <h3 className="filtersCategoryName">{filtersCategoryName}</h3>
      <p className="showCount">
        {total && (
          <>
            SHOWING <b>{limit === 0 || limit >= total! ? total : limit}</b> OF <b>{total}</b>{' '}
            RESULTS
          </>
        )}
      </p>
      is
      <select
        id="crypto-select"
        value={limit}
        onChange={(evt) => {
          dispatch(setCurrentLimit(Number(evt.target.value)));
        }}>
        <option value="0">all</option>
        <option value="15">15</option>
      </select>
    </div>
  );
}
