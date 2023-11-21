import { faAngleLeft, faCircleDot, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponent/Image';
import InputComponent from '../../components/InputComponent/InputComponent';
import './styles.scss';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import userApi from '../../api/userApi';
import { convertPrice } from '../../utils';
import * as message from '../../components/Message/Message';
import orderApi from '../../api/orderApi';
import Loading from '../../components/LoadingComponent/Loading';

function Checkout() {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const [payment, setPayment] = useState('');
    const [stateUser, setStateUser] = useState({
        username: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = userApi.update(id, token, { ...rests });
        return res;
    });
    const mutationAddOrder = useMutationHook((data) => {
        const { token, ...rests } = data;
        const res = orderApi.createOrder(token, { ...rests });
        return res;
    });

    const { data: dataUpdate } = mutationUpdate;
    const {
        data: dataAddOrder,
        isLoading: isLoadingOrder,
        isSuccess: isSuccessOrder,
        isError: isErrorOrder,
    } = mutationAddOrder;
    console.log('dataAddOrder', dataAddOrder);
    useEffect(() => {
        if (isSuccessOrder && dataAddOrder?.status === 'OK') {
            message.success('Bạn đã đặt hàng thành công!');
        } else if (isErrorOrder) {
            message.error('Đặt hàng thất bại!');
        }
    }, [isSuccessOrder, isErrorOrder]);

    useEffect(() => {
        if (user) {
            setStateUser({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
            });
        }
    }, [user]);

    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo <= 0) {
            return 0;
        } else if (priceMemo > 500000) {
            return 10000;
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const handleOnChangeInfo = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleOrder = () => {
        if (!!stateUser?.name && !!stateUser?.email && !!stateUser?.phone && !!stateUser?.address && !!payment) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUser });
            if (user?.access_token && order?.orderItems) {
                mutationAddOrder.mutate({
                    token: user?.access_token,
                    orderItems: order?.orderItems,
                    fullname: stateUser?.name,
                    address: stateUser?.address,
                    phone: stateUser?.phone,
                    city: stateUser?.city,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: priceMemo + diliveryPriceMemo,
                    user: user?.id,
                });
            }
        } else {
            message.warning('Vui lòng điền đủ thông tin!');
        }
    };

    const handleChecked = () => {
        let elements = document.getElementsByName('payment');
        let len = elements.length;
        let checkValue = '';

        for (let i = 0; i < len; i++) {
            if (elements.item(i).checked) {
                checkValue = elements.item(i).value;
            }
        }
        setPayment(checkValue);
    };

    console.log('order', order);
    console.log('user', user);
    console.log('stateUser', stateUser);
    console.log('dataUpdate', dataUpdate);
    console.log('payment', payment);

    return (
        <div>
            <Loading isLoading={isLoadingOrder}>
                <Row>
                    <Col xs={8} style={{ padding: '0 40px' }}>
                        <Row>
                            <div className="logo">
                                <Link to={'/'}>
                                    <h2>Breshka Shose</h2>
                                </Link>
                            </div>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <div className="head_receive">
                                    <h3>Thông tin nhận hàng</h3>
                                    <button>
                                        <FontAwesomeIcon icon={faRightToBracket} style={{ marginRight: '6px' }} />
                                        Đăng xuất
                                    </button>
                                </div>
                                <div className="input_form">
                                    <label htmlFor="email">Email</label>
                                    <InputComponent
                                        id="email"
                                        value={stateUser.email}
                                        onChange={handleOnChangeInfo}
                                        name="email"
                                    />
                                </div>
                                <div className="input_form">
                                    <label htmlFor="name">Họ và tên</label>
                                    <InputComponent
                                        id="name"
                                        value={stateUser.name}
                                        onChange={handleOnChangeInfo}
                                        name="name"
                                    />
                                </div>
                                <div className="input_form">
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <InputComponent
                                        id="phone"
                                        value={stateUser.phone}
                                        onChange={handleOnChangeInfo}
                                        name="phone"
                                    />
                                </div>
                                <div className="input_form">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <InputComponent
                                        id="address"
                                        value={stateUser.address}
                                        onChange={handleOnChangeInfo}
                                        name="address"
                                    />
                                </div>
                                <div className="input_form">
                                    <label htmlFor="city">City</label>
                                    <InputComponent
                                        id="city"
                                        value={stateUser.city}
                                        onChange={handleOnChangeInfo}
                                        name="city"
                                    />
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="head_transport">
                                    <h3>Vận chuyển</h3>
                                    <div className="transport">
                                        <div className="transport_wrap">
                                            <FontAwesomeIcon icon={faCircleDot} />
                                            <label className="ship">
                                                <span className="spot">Giao hàng tận nơi</span>
                                                <span className="price">{convertPrice(diliveryPriceMemo)}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="head_pay">
                                    <h3>Thanh toán</h3>
                                    <div className="pay_form">
                                        <div className="pay_box">
                                            <input
                                                id="cod"
                                                name="payment"
                                                type="radio"
                                                value="cod"
                                                onClick={handleChecked}
                                            />
                                            <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
                                        </div>
                                        <div className="pay_box">
                                            <input
                                                id="card"
                                                name="payment"
                                                type="radio"
                                                value="card"
                                                onClick={handleChecked}
                                            />
                                            <label htmlFor="card">Thanh toán qua thẻ tín dụng</label>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4} style={{ paddingRight: '40px' }}>
                        <div className="order_box">
                            <div className="head">
                                <h2>Đơn hàng ({order?.orderItems?.length} sản phẩm)</h2>
                            </div>
                            <div className="order__summary">
                                <div className="product_form">
                                    <table className="product_table">
                                        <tbody>
                                            {order?.orderItems?.map((item) => (
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
                                                        <span className="product__description--name">{item?.name}</span>
                                                    </td>
                                                    <td className="product__price">{convertPrice(item?.price)}</td>
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
                                                <td style={{ textAlign: 'right' }}>{convertPrice(priceMemo)}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px 0' }}>Phí vận chuyển</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    {convertPrice(diliveryPriceMemo)}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td style={{ padding: '10px 0', fontSize: '20px' }}>Tổng cộng</td>
                                                <td style={{ textAlign: 'right', fontSize: '20px' }}>
                                                    {convertPrice(priceMemo + diliveryPriceMemo)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="form__order">
                                <Link to={'/order'}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                    <span>Quay về giỏ hàng</span>
                                </Link>
                                <button onClick={handleOrder}>Đặt hàng</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Loading>
        </div>
    );
}

export default Checkout;
