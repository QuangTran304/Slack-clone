import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
  },

  // Define reducers and generate associated actions
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

// Export & auto-generate action creators
export const { enterRoom } = appSlice.actions;

// The 'selectors' used to select a value from the state
export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
