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
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async getDetailsOrder(id, access_token) {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async cancelOrder(id, access_token, orderItems) {
        const res = await axiosJWT.delete(
            `${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`,
            { data: orderItems },
            {
                headers: {
                    token: `Beare ${access_token}`,
                },
            },
        );
        return res.data;
    },
    async getAllOrder(access_token) {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async deleteManyOrder(access_token, data) {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/delete-many`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async remove(id, access_token) {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-order/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async update(id, access_token, data) {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/update-order/${id}`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
};

export default orderApi;
