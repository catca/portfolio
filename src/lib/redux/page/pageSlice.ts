import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NewPageSliceProps {
  currentPage: number;
  move: boolean;
  scroll: boolean;
}

const initialState: NewPageSliceProps = {
  currentPage: 1,
  move: false,
  scroll: false,
};

export const newPageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    SET_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.move = true;
    },
    SCROLL_CORRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    INIT_MOVE: (state) => {
      state.move = false;
    },
    ON_SCROLL: (state) => {
      state.scroll = true;
    },
    OFF_SCROLL: (state) => {
      state.scroll = false;
    },
  },
});

export const initMove = () => {
  return async (dispatch: any) => {
    dispatch(INIT_MOVE());
  };
};

export const setCurrentPage = (state: number) => {
  return async (dispatch: any) => {
    dispatch(SET_CURRENT_PAGE(state));
  };
};

export const scrollCurrentPage = (state: number) => {
  return async (dispatch: any) => {
    dispatch(SCROLL_CORRENT_PAGE(state));
  };
};

export const onScroll = () => {
  return async (dispatch: any) => {
    dispatch(ON_SCROLL());
  };
};

export const offScroll = () => {
  return async (dispatch: any) => {
    dispatch(OFF_SCROLL());
  };
};

export const { SCROLL_CORRENT_PAGE, SET_CURRENT_PAGE, INIT_MOVE, ON_SCROLL, OFF_SCROLL } = newPageSlice.actions;
export const selectPage = (state: RootState) => state.page;

export default newPageSlice.reducer;
