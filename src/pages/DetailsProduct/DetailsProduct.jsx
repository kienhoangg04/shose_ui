import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import productApi from '../../api/productApi';
import Card from '../../components/CardComponent/Card';
import ImageCard from '../../components/ImageCardComponent/ImageCard';
import Loading from '../../components/LoadingComponent/Loading';
import TitleComponent from '../../components/TitleComponent/TitleComponent';
import './styles.scss';
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as message from '../../components/Message/Message';
import { addOrderProduct } from '../../redux/slides/orderSlides';

function DetailsProduct() {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    const { id } = useParams();
    const [numProduct, setNumproduct] = useState(1);

    //
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await productApi.getDetailsProduct(id);
            return res.data;
        }
    };

    const { isLoading, data: productDetails } = useQuery(['product-details', id], fetchGetDetailsProduct, {
        enabled: !!id,
    });

    const onChange = (value) => {
        setNumproduct(value);
    };

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumproduct((prev) => prev + 1);
            if (numProduct >= 3) {
                setNumproduct(3);
            }
        }
        if (type === 'decrease') {
            setNumproduct((prev) => prev - 1);
            if (numProduct <= 1) {
                setNumproduct(1);
            }
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
            message.warning('Vui lòng đăng nhập trước khi thực hiện mua!');
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productDetails?.title,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                    },
                }),
            );
        }
    };

    // console.log('user', user);
    // console.log('location', location);
    // console.log('productDetails', productDetails);

    return (
        <div className="form__background">
            <Container>
                <Loading isLoading={isLoading}>
                    <div className="product__main">
                        <div className="details__product">
                            <Row>
                                <Col xs lg={5}>
                                    <div className="product__details--left">
                                        <div className="large__img">
                                            <a href="true">
                                                <ImageCard src={productDetails?.image} alt={productDetails?.title} />
                                            </a>
                                        </div>
                                        {/* <div className="product__thumn">
                                            <div className="thumb__product--details">
                                                <div className="slick__track">
                                                    <div className="item">
                                                        <a href="">
                                                            <ImageCard src={img} alt="card" />
                                                        </a>
                                                    </div>
                                                    <div className="item">
                                                        <a href="">
                                                            <ImageCard src={img} alt="card" />
                                                        </a>
                                                    </div>
                                                    <div className="item">
                                                        <a href="">
                                                            <ImageCard src={img} alt="card" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </Col>
                                <Col xs lg={7} className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                                    <div className="details__pro">
                                        <h1 className="title__product">{productDetails?.title}</h1>
                                        <div className="group__status">
                                            <span className="first__status">
                                                <span className="a_name">Thương hiệu: </span>
                                                <span className="status__name"> Convers</span>
                                                <span className="border-xs"> | </span>
                                            </span>
                                            <span className="first__status status_2">
                                                <span className="a_name">Tình trạng</span>
                                                <span className="status__name">
                                                    <a href="true">
                                                        {productDetails?.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                                    </a>
                                                </span>
                                                <span className="border-xs"> | </span>
                                            </span>
                                            <span className="first__status">
                                                <span className="a_name">Đánh giá: </span>
                                                <Rate allowHalf disabled value={productDetails?.rating} />
                                            </span>
                                        </div>
                                        <div className="group__price">
                                            <div className="price__box">
                                                <span className="special__price">
                                                    <span className="price product-price">
                                                        {productDetails?.price}đ
                                                    </span>
                                                </span>
                                                <span className="old__price">
                                                    <span className="price product-price sale">
                                                        {productDetails?.price_old}đ
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="product__summary">
                                                <div className="rte">
                                                    <p>- Bảo hành 12 tháng</p>
                                                    <p>- Xuất xứ: Mỹ</p>
                                                    <p>- Chất liệu: Vải</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form__product col-sm-12 col-lg-12 col-md-12 col-xs-12">
                                            <div className="box__variant">
                                                <div className="form__group">
                                                    <div className="selector__wrapper">
                                                        <label htmlFor="">Màu sắc</label>
                                                        <select name="" id="" className="single__option--selector">
                                                            <option value="Nâu">Nâu</option>
                                                            <option value="Xanh">Xanh</option>
                                                            <option value="Đỏ">Đỏ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form__group">
                                                <div className="form__product--content">
                                                    <div className="quantity">
                                                        <label htmlFor="">Số lượng</label>
                                                        <div className="input__number--product">
                                                            <button
                                                                className="btn__num num_1"
                                                                onClick={() => handleChangeCount('decrease')}
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={numProduct}
                                                                className="prod__quantity"
                                                                onChange={onChange}
                                                            />
                                                            <button
                                                                className="btn__num num_2"
                                                                onClick={() => handleChangeCount('increase')}
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="button__action">
                                                        <button
                                                            className="btn__add--card"
                                                            onClick={handleAddOrderProduct}
                                                        >
                                                            <span>Thêm vào giỏ hàng</span>
                                                        </button>
                                                    </div>
                                                    <div className="call__phone">
                                                        <span>
                                                            Gọi
                                                            <a href="tell:19006750">1900.6750</a> để được trợ giúp.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tag__product">
                                                <span className="inline">Tags:</span>
                                                <a href="true">Chuck Taylor</a>
                                                <a href="true">Convers</a>
                                                <a href="true">Giày tây</a>
                                                <a href="true">Giày vải</a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Loading>

                <TitleComponent title="Sản phẩm liên quan" href="san-pham-lien-quan" />
                <Slider {...settings} className="slick__product2">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </Slider>
            </Container>
        </div>
    );
}

export default DetailsProduct;
