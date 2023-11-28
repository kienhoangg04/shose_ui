import { axiosJWT } from './userApi';

const cardApi = {
    async createCard(access_token, data) {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/card/create`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async getAllCard(access_token, id) {
        const res = await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/card/get-all-card`,
            { id: id },
            {
                headers: {
                    token: `Beare ${access_token}`,
                },
            },
        );
        return res.data;
    },
    async remove(id, access_token) {
        const res = await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/card/delete-card`,
            { id: id },
            {
                headers: {
                    token: `Beare ${access_token}`,
                },
            },
        );
        return res.data;
    },
};

export default cardApi;
