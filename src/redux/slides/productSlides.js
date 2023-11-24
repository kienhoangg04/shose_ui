import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
};

export const productSlides = createSlice({
    name: 'product',
    initialState,
    reducers: {
        searchProduct: (state, action) => {
            state.search = action.payload;
        },
    },
});

export const { searchProduct } = productSlides.actions;

export default productSlides.reducer;
