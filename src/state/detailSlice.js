import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardPropertyDetail, imageLikeList } from "../components/Api/ListingApi";

const name = "detail";
const initialState = {
  loading: false,
  error: null,
  result: []
};

const fetchdetail = createAsyncThunk("detail/fetchdetail", async (id) => {
  const response = await dashboardPropertyDetail(id);
  let userId = localStorage.getItem('userId')
  response.data.data.images.map((item) => {
    let isLike = item.likes.indexOf(userId)
    let isDisLike = item.dis_likes.indexOf(userId)
    if (isLike !== -1) {
      item.isLike = true
    }
    if (isDisLike !== -1) {
      item.isDisLike = true
    }
  })
  console.log('response', response.data.data.images)
  var result = {}
  if (userId !== null) {
    await imageLikeList(userId).then((res) => {
      var number = res.data.data.indexOf(response.data.data._id)
      if (number !== -1) {
        let data = {
          isLike: res.data.data[number]
        }
        let value = response.data.data
        result = { ...data, ...value }
      }
      else {
        result = response.data.data
      }
    })
  }
  else {
    result = response.data.data
  }
  return result;
});

const detailSlice = createSlice({
  name,
  initialState,
  extraReducers: {
    [fetchdetail.pending]: state => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [fetchdetail.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.result = action.payload;
      }
    },
    [fetchdetail.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    }
  },
  reducers: {
    singlePropertyClear: state => {
      state.result = []
    }, 
    storeResult: (state, action) => {
      state.result = action.payload
  },
  }
});

export { fetchdetail };
export const detail = name;
export const { singlePropertyClear,storeResult } = detailSlice.actions
export const detailReducer = detailSlice.reducer;
