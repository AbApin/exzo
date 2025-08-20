import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoryType, ProductType } from '../../pages/products/productsSlice';
export const BASE_URL = import.meta.env.VITE_BASE_URL;


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductType[], { category: string; limit: number }>({
            query: ({ category, limit }) =>
                `/products?category=${category}${limit > 0 ? `&_limit=${limit}` : ''}`,
        }),
        getTotalProductsByCategory: builder.query<number, string>({
            query: (category) => `/products?category=${category}`,
            transformResponse: (response: ProductType[]) => response.length,
        }),
        getSimpleProduct: builder.query<ProductType, string>({
            query: (id) => `/products/${id}`,
        }),
        getAllCategories: builder.query<CategoryType[], void>({
            query: () => `/categories`,
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetSimpleProductQuery,
    useGetAllCategoriesQuery,
    useGetTotalProductsByCategoryQuery,
} = productsApi;
