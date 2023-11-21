import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ImageCard from '../../components/ImageCardComponent/ImageCard';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlides';
import { convertPrice } from '../../utils';
import './styles.scss';

function Order() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        }
        if (type === 'decrease') {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

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

    // tien hanh mua hang
    const handleAddCard = () => {
        navigate('/checkout');
    };

    console.log('order', order);
    console.log('user', user);

    return (
        <div className="main__card">
            <Container>
                <div className="wrap__backgroup">
                    <div className="header__card">
                        <h3 className="title__card">Giỏ Hàng</h3>
                        {order?.orderItems?.length === 0 && (
                            <div className="title__card--pc">
                                Không có sản phẩm nào. Quay lại
                                <Link to={'/'}> cửa hàng </Link>
                                để tiếp tục mua sắm.
                            </div>
                        )}
                    </div>

                    {order?.orderItems?.length > 0 && (
                        <div className="card__destop">
                            <Row className="">
                                <div className="form__card col-lg-12 col-md-12">
                                    <div className="bg__scroll">
                                        <div className="cart__thead">
                                            <div style={{ width: '17%' }}>Ảnh sản phẩm</div>
                                            <div style={{ width: '33%' }}>Tên sản phẩm</div>
                                            <div style={{ width: '15%' }}>Đơn giá</div>
                                            <div style={{ width: '14%' }}>Số lượng</div>
                                            <div style={{ width: '15%' }}>Thành tiền</div>
                                            <div style={{ width: '6%' }}>Xóa</div>
                                        </div>
                                        <div className="cart__body">
                                            {order?.orderItems?.map((order) => (
                                                <div className="item__card">
                                                    <div style={{ width: '17%' }}>
                                                        <Link to={''} className="product__image" title={''}>
                                                            <ImageCard src={order?.image} />
                                                        </Link>
                                                    </div>
                                                    <div style={{ width: '33%' }}>
                                                        <h3 className="product__name">
                                                            <Link>{order?.name}</Link>
                                                        </h3>
                                                    </div>
                                                    <div style={{ width: '15%' }}>
                                                        <span className="cart__prices">
                                                            <span className="prices">{convertPrice(order?.price)}</span>
                                                        </span>
                                                    </div>
                                                    <div style={{ width: '14%' }}>
                                                        <div className="number__product">
                                                            <button
                                                                className="btn__num num_1"
                                                                onClick={() =>
                                                                    handleChangeCount('decrease', order?.product)
                                                                }
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                defaultValue={order?.amount}
                                                                value={order?.amount}
                                                                className="prod__quantity"
                                                            />
                                                            <button
                                                                className="btn__num num_2"
                                                                onClick={() =>
                                                                    handleChangeCount('increase', order?.product)
                                                                }
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '15%' }}>
                                                        <span className="cart__prices">
                                                            <span className="prices">
                                                                {convertPrice(order?.amount * order?.price)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div style={{ width: '6%' }}>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            onClick={() => handleDeleteOrder(order?.product)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="cart__total">
                                        <div className="table__total col-lg-4 col-lg-offset-8 col-xl-4 col-xl-offset-8">
                                            <div className="dilivery">
                                                Phí vận chuyển {convertPrice(diliveryPriceMemo)}
                                            </div>
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={20} className="total__text">
                                                            Tổng tiền
                                                        </td>
                                                        <td className="totals__price">
                                                            {convertPrice(priceMemo + diliveryPriceMemo)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="continued">
                                        <button className="button__buy" onClick={() => handleAddCard()}>
                                            Tiến hành thanh toán
                                        </button>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Order;
