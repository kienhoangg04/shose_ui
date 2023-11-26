import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import orderApi from '../../api/orderApi';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import TableComponent from '../TableComponent/TableComponent';
import TitleComponent from '../TitleComponent/TitleComponent';
import PieChartComponent from './PieChart';
import './styles.scss';

function AdminOrder() {
    const user = useSelector((state) => state?.user);

    const getOrder = async () => {
        const res = await orderApi.getAllOrder(user?.access_token);
        return res;
    };

    const queryOrder = useQuery(['orders'], getOrder);
    const { data: orders, isLoading: isLoadingOrder } = queryOrder;

    const columns = [
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            sorter: (a, b) => a.fullname.length - b.fullname.length,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
        },
        {
            title: 'Shipped',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
        },
    ];

    const dataTable =
        orders?.data?.length &&
        orders?.data?.map((order) => {
            return {
                ...order,
                key: order._id,
                fullname: order?.shippingAdress?.fullname,
                phone: order?.shippingAdress?.phone,
                address: order?.shippingAdress?.address,
                paymentMethod: orderContant.payment[order?.paymentMethod],
                isPaid: order?.isPaid ? 'True' : 'False',
                isDelivered: order?.isDelivered ? 'True' : 'False',
                totalPrice: convertPrice(order?.totalPrice),
            };
        });

    return (
        <div>
            <TitleComponent title="Quản Lý Đơn Hàng" stylediv={{ marginTop: '20px' }} />
            <div className="pie_chart">
                <PieChartComponent data={orders?.data} />
            </div>
            <div className="table_order">
                <TableComponent
                    dataTable={dataTable}
                    columns={columns}
                    loading={isLoadingOrder}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: (event) => {
                    //             setRowSelected(record._id);
                    //         },
                    //     };
                    // }}
                    // handleDeleteMany={handleDeleteManyProduct}
                />
            </div>
        </div>
    );
}

export default AdminOrder;
