import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';

const initialState = {
    arrProduct: [],
    prodDetail:{

    }
};

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setProductAction: (state, action) => {
            state.arrProduct = action.payload;
        },
        setProductDetailAction: (state,action)=>{
            state.prodDetail = action.payload;
        }
    },
});

export const { setProductAction,setProductDetailAction } = productReducer.actions;

export default productReducer.reducer;

// ===async thunk===
export const getApiProductAsync = async (dispatch) => {
    const res = await http.get('api/product');
    const action = setProductAction(res.data.content);
    dispatch(action);
};
export const getApiProductDetailAsync = (id) =>{
    return async(dispatch)=>{
        const res = await http.get(`/api/Product/getbyid?id=${id}`)
        const action = setProductDetailAction(res.data.content)
   dispatch(action)
    }
}