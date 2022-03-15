import { createSlice } from '@reduxjs/toolkit';

const sorterSlice = createSlice({
  name: 'sorter',
  initialState: 'Last created',
  reducers: {
    setSorter(state, action) {
      return action.payload;
    }
  }
});

export const { setSorter } = sorterSlice.actions;
export default sorterSlice.reducer;
