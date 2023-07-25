import { combineReducers, configureStore,createStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import userReducer from './features/redux/user/userReducer';

export const store = configureStore({
  reducer: {
    user:userSlice,
  },
});

// const rootReducer = combineReducers({
//   user:userReducer
// })

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())