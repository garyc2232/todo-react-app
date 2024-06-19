import {
  configureStore,
  Action,
  ThunkAction,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { refreshJwtAsync } from './auth/authAction';
import { listSlice } from './list/listSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { todoSlice } from './todo/todoSlice';
import { sortOptionSlice } from './sortOption/sortOptionSlice';
import { REFRESH_TOKEN } from '../const/localStorageKey';
import { modalSlice } from './modal/modalSlice';
import { tagSlice } from './tag/tagSlice';
import { fetchTagAsync } from './tag/tagAction';
import { statusSlice } from './status/statusSlice';
import { fetchStatusAsync } from './status/statusAction';
import { filterSlice } from './filter/filterSlice';

const errorHandlerMiddleware =
  (store: any) => (next: any) => async (action: any) => {
    if (action.error) {
      // Perform your custom error handling here
      console.log('An error occurred:', action);
      if (
        action.payload?.statusCode === 401 &&
        localStorage.getItem(REFRESH_TOKEN)
      ) {
        await store.dispatch(refreshJwtAsync());
      }
    }

    return next(action);
  };

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  list: listSlice.reducer,
  todo: todoSlice.reducer,
  sortOption: sortOptionSlice.reducer,
  modal: modalSlice.reducer,
  tag: tagSlice.reducer,
  status: statusSlice.reducer,
  filter: filterSlice.reducer,
});
export const setupStore = (reducer: Reducer<any, any>) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        errorHandlerMiddleware,
      ),
  });

const store = setupStore(rootReducer);

localStorage.getItem(REFRESH_TOKEN) && store.dispatch(refreshJwtAsync());

store.dispatch(fetchTagAsync());
store.dispatch(fetchStatusAsync());

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<T = void, A = unknown> = ThunkAction<
  Promise<T>,
  RootState,
  A,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
