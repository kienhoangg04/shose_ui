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
    isPaid: 0,
    paiAt: '',
    isDelivered: 0,
    delivered: '',
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem, userId } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount;
            } else {
                state.orderItems.push(orderItem);
                state.user = userId;
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
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            state.orderItems = itemOrders;
        },
        removeAllOrder: (state) => {
            state.orderItems = [];
        },
        updateOrder: (state, action) => {
            const { orderItems = [], user = '' } = action.payload;
            state.orderItems = orderItems;
            state.user = user;
        },
    },
});

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    removeAllOrder,
    updateOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
