import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
    name: 'products',
    initialState: {
        productCategories: [],
        loading: false,
        error: false,
    },
    reducers: {
        setProductCategories(state, action) {
            state.productCategories = action.payload;
            state.loading = false;
        },
        productsLoading(state) {
            state.loading = true;
        },
        setError(state) {
            state.error = true;
            state.loading = false;
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = slice;

export function getProductCategories() {
    return async (dispatch) => {
        dispatch(actions.productsLoading());
        axios
            .get(
                'https://developertests.z33.web.core.windows.net/ReactTestData.json'
            )
            .then((res) => {
                dispatch(actions.setProductCategories(res.data));
            })
            .catch((err) => {
                dispatch(actions.setError());
            });
    };
}

export default reducer;
