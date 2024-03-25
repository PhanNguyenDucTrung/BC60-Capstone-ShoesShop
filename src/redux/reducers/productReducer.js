import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';

const initialState = {
    arrProduct:[]
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setProductAction:(state,action)=>{
        state.arrProduct = action.payload
    }
  }
});

export const {setProductAction} = productReducer.actions

export default productReducer.reducer

// ===async thunk===
export const getApiProductAsync = async (dispatch)=>{
  const res  = await http.get('api/product')

  const action = setProductAction(res.data.content)
  dispatch(action)
}