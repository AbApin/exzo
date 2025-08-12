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
      <div className="showVersionsBtns">
        <button
          onClick={() => dispatch(changeShowVersion('wrap'))}
          className={showVersion === 'wrap' ? 'showVersionsBtn active' : 'showVersionsBtn '}>
          <svg
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect
              width="38"
              height="38"
              transform="translate(0.0899963 0.690002)"
              fill="url(#pattern0_18_2576)"
            />
            <defs>
              <pattern
                id="pattern0_18_2576"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1">
                <use xlinkHref="#image0_18_2576" transform="scale(0.0263158)" />
              </pattern>
              <image
                id="image0_18_2576"
                width="38"
                height="38"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAG5JREFUeNrs1bEJwCAQhWG1iPu4hCsnQ8R9rE4LTSnhCOGE/8EVFsqHPtCLiLMYDwwYMGDAgAHbExaU+2TOVeJy/TfM7I3Z7Nh4rlfJqSrL0mGKeXLex3KtPJ+O0TE6xl8JDBgwYMCAAfsmTYABABCjWDn4QV29AAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
        </button>
        <button
          onClick={() => dispatch(changeShowVersion('column'))}
          className={showVersion === 'column' ? 'showVersionsBtn active' : 'showVersionsBtn '}>
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect x="0.579987" y="1.19" width="39" height="39" rx="4.5" stroke="#EEEEEE" />
            <rect
              width="38"
              height="38"
              transform="translate(1.07999 1.69)"
              fill="url(#pattern0_18_2577)"
            />
            <defs>
              <pattern
                id="pattern0_18_2577"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1">
                <use xlinkHref="#image0_18_2577" transform="scale(0.0263158)" />
              </pattern>
              <image
                id="image0_18_2577"
                width="38"
                height="38"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFNJREFUeNrs1TEKwDAIQNEKvbNn8NRmC6WzgQzPPfIIH4zufm6cAAMDAwMDA5uHVdV+lJlxAvZOLPlDJ+DX/pjGNKYxjWnMEQcDAwMDAwP7zhJgAJDEmMfqIZH+AAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
        </button>
      </div>
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
