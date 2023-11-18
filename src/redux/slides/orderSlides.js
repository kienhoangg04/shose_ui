import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    shippingAdress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paiAt: '',
    isDelivered: false,
    delivered: '',
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            itemOrder.amount++;
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            itemOrder.amount--;
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            state.orderItems = itemOrder;
        },
    },
});

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct } = orderSlide.actions;

export default orderSlide.reducer;
