import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search:{
        name:'',
        displayName:''
    },
    price:{
        min:null,
        max:null,
        displayMin:null,
        displayMax:null
    },
    room:{
        bed:'',
        bath:''
    },
    homeType:'',
    details:{
        squareFeetMin: '',
        squareFeetMax: '',
        pricesquareFeetMin: '',
        pricesquareFeetMax: '',
        lotSizeMin: '',
        lotSizeMax: '',
        yearBuildMin: '',
        yearBuildMax: '',
        costFinance: '',
        poolType: '',
        amenitiesString: '',
        houseViewString: '',
        storiesMin: '',
        storiesMax: '',
        walkScore: '',
        bikeScore: '',
    },
    page:{
        list: true,
        image: false,
        map: false
    },
    googleSearch:{
        lat:null,
        lng:null,
        zoom:null
    }
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        dashboardSearch: (state, action) => {
            state.search = action.payload
            console.log('action.payload',action.payload)
        },
        dashboardPrice:(state,action)=>{
            state.price=action.payload
        },
        dashboardRoom:(state,action)=>{
            state.room=action.payload
        },
        dashboardHomeType:(state,action)=>{
            state.homeType=action.payload
        },
        dashboardDetails:(state,action)=>{
            state.details=action.payload
        },
        dashboardPage:(state,action)=>{
            state.page=action.payload
        },
        dashboardGoogleSearch:(state,action)=>{
            state.googleSearch=action.payload
        }
    },
})  

// Action creators are generated for each case reducer function
export const { dashboardSearch,dashboardPrice,dashboardRoom,dashboardHomeType,dashboardDetails,dashboardPage,dashboardGoogleSearch } = dashboardSlice.actions
// export const user = "user";
export const dashboardReducer = dashboardSlice.reducer;