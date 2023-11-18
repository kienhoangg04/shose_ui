import axios from 'axios';

export const axiosJWT = axios.create();

const userApi = {
    async login(data) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
        return res.data;
    },

    async getAll(access_token) {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-all`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },

    async get(id, access_token) {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },

    async add(data) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
        return res.data;
    },

    async update(id, access_token, data) {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },

    async remove(id, access_token) {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },

    async refreshToken() {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
            withCredentials: true,
        });
        return res.data;
    },

    async logoutUser() {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
        return res.data;
    },

    async deleteManyUser(access_token, data) {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
};

export default userApi;
