import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import orderApi from '../../../api/orderApi';
import Loading from '../../../components/LoadingComponent/Loading';
import { orderContant } from '../../../contant';
import { convertPrice } from '../../../utils';
import './styles.scss';

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
    const { data = [], isLoading } = queryOrder;

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
                                {data[0]?.orderItems.length > 0 ? (
                                    data?.map((item) => (
                                        <tr>
                                            <td>a</td>
                                            <td>{item?.createdAt}</td>
                                            <td>
                                                {item?.shippingAdress?.address}, {item?.shippingAdress?.city}, Việt Nam
                                            </td>
                                            <td>{convertPrice(item?.totalPrice)}</td>
                                            <td>{orderContant.payment[item?.paymentMethod]}</td>
                                            <td>Chưa vận chuyển</td>
                                        </tr>
                                    ))
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
