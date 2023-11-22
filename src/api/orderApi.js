import { axiosJWT } from './userApi';

const orderApi = {
    async createOrder(access_token, data) {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async getOrderByUserId(id, access_token) {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
};

export default orderApi;
