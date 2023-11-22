import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    avatar: '',
    access_token: '',
    isAdmin: false,
    city: '',
    id: '',
};

export const useSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                username = '',
                name = '',
                email = '',
                phone = '',
                dateOfBirth = '',
                address = '',
                avatar = '',
                _id = '',
                access_token = '',
                isAdmin = '',
                city = '',
            } = action.payload;
            state.username = username;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.dateOfBirth = dateOfBirth;
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.city = city;
        },
        resetUser: (state) => {
            state.username = '';
            state.name = '';
            state.email = '';
            state.phone = '';
            state.dateOfBirth = '';
            state.address = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = '';
        },
    },
});

export const { updateUser, resetUser } = useSlide.actions;

export default useSlide.reducer;
