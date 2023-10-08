import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface iUser {
    id?: number,
    email?: string,
    username?: string,
    createdAt?: Date,
    updatedAt?: Date
}
const initialState = {
    user: {} as iUser
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<iUser>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = {}
        }
    }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer