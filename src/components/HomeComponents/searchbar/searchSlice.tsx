import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchValue: string;
    searchHistory: string[];
    products: string[];
}

const initialState: SearchState = {
    searchValue: '',
    searchHistory: [],
    products: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSearchHistory(state, action: PayloadAction<string[]>) {
            state.searchHistory = action.payload;
        },
        clearSearchHistory(state) {
            state.searchHistory = [];
        },
        setProducts(state, action: PayloadAction<string[]>) {
            state.products = action.payload;
        },
    },
});

export const { setSearchValue, setSearchHistory, clearSearchHistory, setProducts } = searchSlice.actions;
export default searchSlice.reducer;