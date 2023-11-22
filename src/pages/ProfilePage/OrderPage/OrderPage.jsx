import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import orderApi from '../../../api/orderApi';
import Loading from '../../../components/LoadingComponent/Loading';
import './styles.scss';
import { convertPrice } from '../../../utils';
import { orderContant } from '../../../contant';

function OrderPage() {
    const user = useSelector((state) => state.user);
    const fetchMyOrder = async () => {
        const res = await orderApi.getOrderByUserId(user?.id, user?.access_token);
        return res.data;
    };
    const queryOrder = useQuery(
        { queryKey: ['orders-details'], queryFn: fetchMyOrder },
        {
            enabled: user?.id && user?.access_token,
        },
    );
    const { data, isLoading } = queryOrder;

    return (
        <Loading isLoading={isLoading}>
            <div className="order__box">
                <h1 className="title">Đơn hàng của bạn</h1>
                <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                    <div className="table overflow-x-auto">
                        <table className="table__order">
                            <thead>
                                <tr>
                                    <th>Đơn hàng</th>
                                    <th>Ngày</th>
                                    <th>Địa chỉ</th>
                                    <th>Giá trị đơn hàng</th>
                                    <th>TT thanh toán</th>
                                    <th>TT vận chuyển</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.orderItems.length > 0 ? (
                                    <tr>
                                        <td>a</td>
                                        <td>{data?.createdAt}</td>
                                        <td>
                                            {data?.shippingAdress?.address}, {data?.shippingAdress?.city}, Việt Nam
                                        </td>
                                        <td>{convertPrice(data?.totalPrice)}</td>
                                        <td>{orderContant.payment[data?.paymentMethod]}</td>
                                        <td>Chưa vận chuyển</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={6}>
                                            <p>Không có đơn hàng nào</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default OrderPage;
