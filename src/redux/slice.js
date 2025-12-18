
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
}

// 
export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        storeUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        }
    }
})

// 


export const {storeUser, clearUser}= userSlice.actions;
export default userSlice.reducer;

