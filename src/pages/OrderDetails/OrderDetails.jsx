import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponent/Image';
import Loading from '../../components/LoadingComponent/Loading';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import './styles.scss';
import orderApi from '../../api/orderApi';
import { useQuery } from 'react-query';

function OrderDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const { id } = useParams();

    const fetchMyOrderDetails = async () => {
        const res = await orderApi.getDetailsOrder(id, state?.token);
        return res;
    };

    const queryOrderDetails = useQuery(
        { queryKey: ['details-order'], queryFn: fetchMyOrderDetails },
        {
            enabled: id,
        },
    );
    const { data, isLoading } = queryOrderDetails;

    const handleNavigate = () => {
        navigate('/profile/orders');
    };

    return (
        <Container>
            <Loading isLoading={isLoading}>
                <div className="success__box">
                    <div className="logo">
                        <h2>Breahka Shose</h2>
                    </div>
                    <Row>
                        <Col xs={7}>
                            <div className="head__success">
                                <h2>Chi tiết đơn hàng</h2>
                            </div>
                            <div className="info__success">
                                <Row>
                                    <Col>
                                        <h2 className="title">Thông tin mua hàng</h2>
                                        <ul className="info__list">
                                            <li className="info__item">{data?.data?.shippingAdress?.fullname}</li>
                                            <li className="info__item">{data?.data?.shippingAdress?.email}</li>
                                            <li className="info__item">+86{data?.data?.shippingAdress?.phone}</li>
                                        </ul>
                                    </Col>
                                    <Col>
                                        <h2 className="title">Địa chỉ nhận hàng</h2>
                                        <ul className="info__list">
                                            <li className="info__item">{data?.data?.shippingAdress?.fullname}</li>
                                            <li className="info__item">{data?.data?.shippingAdress?.address}</li>
                                            <li className="info__item">{data?.data?.shippingAdress?.city}</li>
                                            <li className="info__item">+86{data?.data?.shippingAdress?.phone}</li>
                                        </ul>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h2 className="title">Phương thức thanh toán</h2>
                                        <p className="text_item">{orderContant.payment[data?.data?.paymentMethod]}</p>
                                    </Col>
                                    <Col>
                                        <h2 className="title">Phương thức vận chuyển</h2>
                                        <p className="text_item">Giao hàng tận nơi</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h2 className="title">Thanh toán</h2>
                                        <p className="text_item">
                                            {data?.data?.isPaid === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                        </p>
                                    </Col>
                                    <Col>
                                        <h2 className="title">Trạng thái giao hàng</h2>
                                        <p className="text_item">
                                            {data?.data?.isDelivered === 0 && 'Chưa vận chuyển'}
                                            {data?.data?.isDelivered === 1 && 'Đang vận chuyển'}
                                            {data?.data?.isDelivered === 2 && 'Đã giao hàng'}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="foot__success">
                                <button className="btn_continue" onClick={handleNavigate}>
                                    Quay lại trang order
                                </button>
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div className="order_box">
                                <div className="head_success">
                                    <h2>
                                        Đơn hàng #{data?.data && (data?.data?._id).substr(-4, 4)} (
                                        {data?.data?.orderItems.length})
                                    </h2>
                                </div>
                                <div className="order__summary">
                                    <div className="product_form">
                                        <table className="product_table">
                                            <tbody>
                                                {data?.data?.orderItems.map((item) => (
                                                    <tr className="product">
                                                        <td className="product__image">
                                                            <div className="product__thumbnail">
                                                                <div className="product__wrap">
                                                                    <ImageComponent src={item?.image} />
                                                                    <span className="product__quantity">
                                                                        {item?.amount}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="product__description">
                                                            <span className="product__description--name">
                                                                {item?.name}
                                                            </span>
                                                        </td>
                                                        <td className="product__price">
                                                            {convertPrice(item?.price * item?.amount)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="order__summary">
                                    <div className="product_form">
                                        <table className="product_table">
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '5px 0' }}>Tạm tính</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        {convertPrice(data?.data?.itemsPrice)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '5px 0' }}>Phí vận chuyển</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        {convertPrice(data?.data?.shippingPrice)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td style={{ padding: '10px 0', fontSize: '20px' }}>Tổng cộng</td>
                                                    <td style={{ textAlign: 'right', fontSize: '20px' }}>
                                                        {convertPrice(data?.data?.totalPrice)}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Loading>
        </Container>
    );
}

export default OrderDetails;
