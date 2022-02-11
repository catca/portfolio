import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pageSlice from './page/pageSlice';
import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // page localstorage에 저장합니다.
  whitelist: ['page'],
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  page: pageSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
