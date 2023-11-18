import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageCard from '../../components/ImageCardComponent/ImageCard';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlides';
import './styles.scss';

function Order() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);

    console.log('order', order);

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
        console.log('id', idProduct);
    };

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
                                                            <span className="prices">{order?.price}đ</span>
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
                                                                {order?.amount * order?.price}đ
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div style={{ width: '6%' }}>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            onClick={() => handleDeleteOrder(order?.product)}
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
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={20} className="total__text">
                                                            Tổng tiền
                                                        </td>
                                                        <td className="totals__price">450.000d</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="continued">
                                        <button className="button__buy">Tiến hành thanh toán</button>
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
