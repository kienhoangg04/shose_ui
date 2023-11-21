import axios from 'axios';

import { axiosJWT } from './userApi';

const productApi = {
    async getAllProduct() {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res.data;
    },
    async getProductType(type) {
        if (type) {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}`);
            return res.data;
        }
    },
    async getDetailsProduct(id) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
        return res.data;
    },
    async createProduct(data) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
        return res.data;
    },
    async updateProduct(id, access_token, data) {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async deleteProduct(id, access_token) {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async deleteManyProduct(access_token, ids) {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, ids, {
            headers: {
                token: `Beare ${access_token}`,
            },
        });
        return res.data;
    },
    async getAllTypeProduct() {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
        return res.data;
    },
};

export default productApi;