import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponent/Image';
import Loading from '../../components/LoadingComponent/Loading';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import './styles.scss';

function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    const { state } = location;
    // console.log('state', state);

    const handleNavigate = () => {
        navigate('/');
    };
    return (
        <Container>
            <Loading isLoading={false}>
                <div className="success__box">
                    <div className="logo">
                        <h2>Breahka Shose</h2>
                    </div>
                    <Row>
                        <Col xs={7}>
                            <div className="head__success">
                                <h2>Cảm ơn bạn đã đặt hàng</h2>
                                <p>Một email xác nhận đã được gửi tới {state?.user?.email}</p>
                                <p>Xin vui lòng kiểm tra email của bạn</p>
                            </div>
                            <div className="info__success">
                                <Row>
                                    <Col>
                                        <h2 className="title">Thông tin mua hàng</h2>
                                        <ul className="info__list">
                                            <li className="info__item">{state?.user?.name}</li>
                                            <li className="info__item">{state?.user?.email}</li>
                                            <li className="info__item">+86{state?.user?.phone}</li>
                                        </ul>
                                    </Col>
                                    <Col>
                                        <h2 className="title">Địa chỉ nhận hàng</h2>
                                        <ul className="info__list">
                                            <li className="info__item">{state?.user?.name}</li>
                                            <li className="info__item">{state?.user?.address}</li>
                                            <li className="info__item">{state?.user?.city}</li>
                                            <li className="info__item">+86{state?.user?.phone}</li>
                                        </ul>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h2 className="title">Phương thức thanh toán</h2>
                                        <p className="text_item">{orderContant.payment[state?.payment]}</p>
                                    </Col>
                                    <Col>
                                        <h2 className="title">Phương thức vận chuyển</h2>
                                        <p className="text_item">Giao hàng tận nơi</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="foot__success">
                                <button className="btn_continue" onClick={handleNavigate}>
                                    Tiếp tục mua hàng
                                </button>
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div className="order_box">
                                <div className="head_success">
                                    <h2>Đơn hàng #0112 (1)</h2>
                                </div>
                                <div className="order__summary">
                                    <div className="product_form">
                                        <table className="product_table">
                                            <tbody>
                                                {state?.orders.map((item) => (
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
                                                        {convertPrice(state?.totalPrice)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '5px 0' }}>Phí vận chuyển</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        {convertPrice(state?.diliveryPrice)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td style={{ padding: '10px 0', fontSize: '20px' }}>Tổng cộng</td>
                                                    <td style={{ textAlign: 'right', fontSize: '20px' }}>
                                                        {convertPrice(state?.totalPrice + state?.diliveryPrice)}
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

export default OrderSuccess;
