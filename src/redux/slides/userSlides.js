import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    avatar: '',
    access_token: '',
    isAdmin: false,
};

export const useSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                username = '',
                email = '',
                phone = '',
                dateOfBirth = '',
                address = '',
                avatar = '',
                _id = '',
                access_token = '',
                isAdmin = '',
            } = action.payload;
            state.username = username;
            state.email = email;
            state.phone = phone;
            state.dateOfBirth = dateOfBirth;
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.username = '';
            state.email = '';
            state.phone = '';
            state.dateOfBirth = '';
            state.address = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
        },
    },
});

export const { updateUser, resetUser } = useSlide.actions;

export default useSlide.reducer;
