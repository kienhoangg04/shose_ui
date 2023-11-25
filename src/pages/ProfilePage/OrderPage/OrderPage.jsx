import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import orderApi from '../../../api/orderApi';
import Loading from '../../../components/LoadingComponent/Loading';
import { orderContant } from '../../../contant';
import { convertPrice } from '../../../utils';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMutationHook } from '../../../hooks/useMutationHook';
import * as message from '../../../components/Message/Message';

function OrderPage() {
    const navigate = useNavigate();
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

    const handleOrderDetails = (id) => {
        navigate(`/order-details/${id}`, {
            state: {
                token: user?.access_token,
            },
        });
    };

    const mutation = useMutationHook((data) => {
        const { id, token, orderItems } = data;
        const res = orderApi.cancelOrder(id, token, orderItems);
        return res;
    });

    const handleCancelOrder = (order) => {
        mutation.mutate(
            { id: order._id, token: user?.access_token, orderItems: order?.orderItems },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            },
        );
    };

    const {
        data: dataCancel,
        isSuccess: isSuccessCancel,
        isError: isErrorCancel,
        isLoading: isLoadingCancel,
    } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancel.status === 'OK') {
            message.success('Xóa đơn hàng thành công!');
        } else if (isErrorCancel) {
            message.error('Xóa đơn hàng thất bại!');
        }
    }, [isSuccessCancel, isErrorCancel]);

    return (
        <Loading isLoading={isLoading || isLoadingCancel}>
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
                                    <th>Action</th>
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
                                            <td>
                                                <div className="form_action">
                                                    <FontAwesomeIcon
                                                        icon={faBinoculars}
                                                        className="btn_vieworder"
                                                        onClick={() => handleOrderDetails(item?._id)}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="btn_cancel"
                                                        onClick={() => handleCancelOrder(item)}
                                                    />
                                                </div>
                                            </td>
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
