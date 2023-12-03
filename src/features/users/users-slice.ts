import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTC: boolean;
  picture: string;
  country: string;
}

export const userSlice = createSlice({
  name: 'users',
  initialState: { userList: [] as User[] },
  reducers: {
    addUser: (state, action) => {
      state.userList = [...state.userList, action.payload];
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
