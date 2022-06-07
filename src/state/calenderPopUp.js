import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    calenderDetails: [],
};

export const calenderSlice = createSlice({
    name: 'calender',
    initialState,
    reducers: {
        calenderResponse: (state, action) => {
            state.calenderDetails = action.payload
        },
    },
})  

// Action creators are generated for each case reducer function
export const { calenderResponse } = calenderSlice.actions
// export const user = "user";
export default calenderSlice.reducer;