import { createSlice } from "@reduxjs/toolkit"

interface UserInitialState {
    email: string,
    token: string,
    id: string,
}

const initialState: UserInitialState = {
    email: '',
    token: '',
    id: '',
}
// state.email = action.payload.email,
//     state.token = action.payload.token,
//     state.id = action.payload.id
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.
        },
        removeUser: (state) => {
            state.email = '',
                state.token = '',
                state.id = ''
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
