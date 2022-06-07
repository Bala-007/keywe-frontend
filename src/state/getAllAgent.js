import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAgents } from "../components/Api/ListingApi";

const initialState = {
    loading: false,
    error: null,
    result: []
};

const getAgent = createAsyncThunk("detail/getAllAgent", async (params) => {
    const response=await getAllAgents(params)
    return response.data
})

const getAgentSlice=createSlice({
    name:"getAgent",
    initialState,
    extraReducers:{
        [getAgent.pending]:state=>{
            if(!state.loading){
                state.loading=true
            }
        },
        [getAgent.fulfilled]:(state,action)=>{
            if(state.loading){
                state.loading=false;
                state.result=action.payload
            }
        },
        [getAgent.rejected]:(state,action)=>{
            if(state.loading){
                state.loading=false;
                state.error=action.payload
            }
        }
    },
    reducers:{
        getClearAgent:state=>{
            state.result=[]
        }
    }
})
export {getAgent};
export const {getClearAgent}=getAgentSlice.actions
export const getAllAgent = getAgentSlice.reducer;