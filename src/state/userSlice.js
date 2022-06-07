import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetail: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userResponse: (state, action) => {
            state.userDetail = action.payload
        },
        logout: state => {
            state.userDetail = {}
        }
    },
})

// Action creators are generated for each case reducer function
export const { userResponse, logout } = userSlice.actions
// export const user = "user";
export default userSlice.reducer;