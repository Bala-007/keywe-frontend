import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { claimAgentList } from "../components/Api/ListingApi";

const initialState = {
    loading: false,
    error: null,
    result: []
};

const claimAgent = createAsyncThunk("detail/claimAgent", async (id) => {
    const response=await claimAgentList(id)
    console.log('claimAGent list',response.data)
    return response.data.data
})

const claimAgentSlice=createSlice({
    name:"claimAgent",
    initialState,
    extraReducers:{
        [claimAgent.pending]:state=>{
            if(!state.loading){
                state.loading=true
            }
        },
        [claimAgent.fulfilled]:(state,action)=>{
            if(state.loading){
                state.loading=false;
                state.result=action.payload
            }
        },
        [claimAgent.rejected]:(state,action)=>{
            if(state.loading){
                state.loading=false;
                state.error=action.payload
            }
        }
    },
    reducers:{
        clearClaimAgent:state=>{
            state.result=[]
        }
    }
})
export {claimAgent};
export const {clearClaimAgent}=claimAgentSlice.actions
export const claimAgentLists = claimAgentSlice.reducer;