import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ProductType = {
  id: string,
  title: string,
  category: string,
  price: number,
  thumbnail: string,
  discountPercentage: number,
  images: Array<string>,
  reviews: Array<Object>,
  availabilityStatus: string,
  description: string
}

export type FavouriteProductType = {
  id: string;
  title: string;
  category: CategoryType;
  price: number;
  thumbnail: string;
  discountPercentage: number;
};

export type CartType = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  count: number;
  discountPercentage: number;
};

export type CategoryType = {
  slug: string;
  name: string;
};



export const fetchAllFavoriteProducts = createAsyncThunk<FavouriteProductType[]>(
  'products/fetchAllFavoriteProducts',
  async () => {
    const res = await fetch(`http://localhost:5000/favourites`);
    const data = await res.json();
    return data;
  },
);

export const fetchAllCartProducts = createAsyncThunk<CartType[]>('products/fetchAllCartProducts', async () => {
  const res = await fetch(`http://localhost:5000/carts`);
  const data = await res.json();
  return data;
});


export const addFavourite = createAsyncThunk<FavouriteProductType, { product: ProductType }>(
  'products/addFavourite',
  async ({ product }: { product: ProductType }, { dispatch }) => {
    const response = await fetch(`http://localhost:5000/favourites/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product), // ✅ just product, not { product }
    });

    dispatch(fetchAllFavoriteProducts())

    if (!response.ok) {
      throw new Error('Failed to add to favourites');
    }
    return await response.json();
  },
);

export const removeFavourite = createAsyncThunk<string, { id: string }>(
  'products/removeFavourite',
  async ({ id }, { dispatch }) => {
    const response = await fetch(`http://localhost:5000/favourites/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove from favourites');
    }

    dispatch(fetchAllFavoriteProducts())

    return id;
  },
);

export const addToCart = createAsyncThunk<CartType, { product: ProductType }>(
  'products/addToCart',
  async ({ product }, { dispatch, getState }) => {
    const { products } = getState() as RootState;

    const existingItem = products.carts.find((item) => item.id === product.id);
    let response;
    console.log(existingItem?.id)

    if (existingItem) {
      // ✅ Use existingItem.id instead of product.id
      response = await fetch(`http://localhost:5000/carts/${existingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: existingItem.count + 1 }),
      });
    } else {
      response = await fetch(`http://localhost:5000/carts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, count: 1 }),
      });
    }

    // ✅ Error check
    if (!response.ok) {
      throw new Error('Failed to update or add product to cart');
    }

    await dispatch(fetchAllCartProducts()); // sync full cart state
    return await response.json();
  },
);
export const removeCart = createAsyncThunk<string, { id: string }>('products/removeCart', async ({ id }, { dispatch }) => {
  const response = await fetch(`http://localhost:5000/carts/${id}`, {
    method: 'DELETE',
  }).finally(() => dispatch(fetchAllCartProducts()));

  if (!response.ok) {
    throw new Error('Failed to remove from favourites');
  }

  return id; // We just need to return the ID we removed
});

export const cartCountMinus = createAsyncThunk<string, { cart: CartType }>(
  'products/cartCountMinus',
  async ({ cart }, { dispatch }) => {
    let updateCount = cart.count - 1;
    console.log(updateCount);
    let response = await fetch(`http://localhost:5000/carts/${cart.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: updateCount }),
    }).finally(() => dispatch(fetchAllCartProducts()));

    if (!response.ok) {
      throw new Error('Failed to remove from favourites');
    }

    return cart.id;
  },
);

export const cartCountPlus = createAsyncThunk<string, { cart: CartType }>(
  'products/cartCountPlus',
  async ({ cart }, { dispatch }) => {
    let updateCount = cart.count + 1;
    console.log(updateCount);
    let response = await fetch(`http://localhost:5000/carts/${cart.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: updateCount }),
    }).finally(() => dispatch(fetchAllCartProducts()));

    if (!response.ok) {
      throw new Error('Failed to remove from favourites');
    }

    return cart.id;
  },
);

interface ProductsState {
  products: ProductType[],
  simpleProduct: {
    data: ProductType,
    isLoading: boolean,
  },
  favourites: Array<FavouriteProductType>,
  carts: Array<CartType>,
  cartsProductsCount: number,
  cartsProductsSum: number,
  total: number,
  limit: number,
  showVersion: string,
  categories: Array<CategoryType>,
  currentCategory: string,
  isLoading: boolean,
}

const initialState: ProductsState = {
  products: [],
  simpleProduct: {
    data: {} as ProductType,
    isLoading: false,
  },
  favourites: [],
  carts: [],
  cartsProductsCount: 0,
  cartsProductsSum: 0,
  total: 0,
  limit: 0,
  showVersion: 'wrap',
  categories: [],
  currentCategory: 'beauty',
  isLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeShowVersion: (state, action: PayloadAction<string>) => {
      state.showVersion = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    setCurrentLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFavoriteProducts.fulfilled, (state, action) => {
      state.favourites = action.payload;
    });
    builder.addCase(addFavourite.fulfilled, (state, action) => {
      const favoriteProduct = action.payload;
      const exists = state.favourites.find((p) => p.id === favoriteProduct.id);
      if (!exists) {
        state.favourites.push(favoriteProduct);
      }
    });
    builder.addCase(fetchAllCartProducts.fulfilled, (state, action) => {
      state.carts = action.payload;
      state.cartsProductsCount = action.payload.length;
      state.cartsProductsSum = action.payload.reduce((sum: number, cartItem: CartType) => {
        return (
          sum +
          Number((cartItem.price - (cartItem.price * cartItem.discountPercentage) / 100).toFixed(2)) *
          cartItem.count
        );
      }, 0);
    });
  },
});

export const { changeShowVersion, setCurrentCategory, setCurrentLimit } = productsSlice.actions;

export default productsSlice.reducer;
