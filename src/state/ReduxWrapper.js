import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

import userReducer from "./userSlice";
import { detail, detailReducer } from "./detailSlice";
import calenderResponse from './calenderPopUp';
import { claimAgentLists } from './claimAgentList';
import { getAllAgent } from './getAllAgent';
import { dashboardReducer } from './dashboardViewAction';
import AgentEditProfile from '../pages/agents/AgentEditProfile';

const combinedReducer = combineReducers({
  user: userReducer,
  [detail]: detailReducer,
  calender:calenderResponse,
  claimAgent:claimAgentLists,
  getAgent:getAllAgent,
  dashboard:dashboardReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === ) {
//     // for all keys defined in your persistConfig(s)
//     storage.removeItem('persist:root')
//     // storage.removeItem('persist:otherKey')

//     return appReducer(undefined, action);
// }
// return appReducer(state, action);
// }


const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    storage.removeItem('persist:root')
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const createStore = () => configureStore({
//   reducer: rootReducer
// });

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

let persistor = persistStore(store);

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
     {/* <AgentEditProfile/> */}
    </PersistGate>
  </Provider>
);
