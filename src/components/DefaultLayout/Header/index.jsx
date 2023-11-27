import { faCartShopping, faLockOpen, faMagnifyingGlass, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../../../api/userApi';
import logo from '../../../assets/images/header/logo.webp';
import { searchProduct } from '../../../redux/slides/productSlides';
import { resetUser } from '../../../redux/slides/userSlides';
import Image from '../../ImageComponent/Image';
import './styles.scss';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);

    const [valueSearch, setValueSearch] = useState('');

    const handleLogout = async () => {
        await userApi.logoutUser();
        navigate('/');
        localStorage.removeItem('access_token');
        dispatch(resetUser());
    };

    const handleSearch = () => {
        dispatch(searchProduct(valueSearch));
        navigate('/search');
    };
    // const handleKeyDown = (e) => {
    //     if (e.keyCode) {
    //         handleSearch();
    //     }
    // };

    const handleOnChange = (e) => {
        setValueSearch(e.target.value);
    };

    const handleNavigateType = (type) => {
        navigate(
            `/product/${type
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/ /g, '_')}`,
            {
                state: type,
            },
        );
    };

    return (
        <header>
            <div className="top__header">
                <Container>
                    <Row>
                        <Col xs={3}>
                            <Link to="/">
                                <Image src={logo} alt="Logo" />
                            </Link>
                        </Col>
                        <Col xs={9}>
                            {/* {user?.email ? (
                                <span>{user.email}</span>
                            ) : (
                                <span>Chưa đăng nhập</span>
                            )} */}
                            <div className="content__header">
                                <div className="cart">
                                    <div
                                        className={
                                            order?.orderItems?.length > 0
                                                ? 'cart__contain float-end'
                                                : 'cart__contain float-end hov'
                                        }
                                    >
                                        <div className="heading__cart float-start">
                                            <Link to={'/order'}>
                                                <FontAwesomeIcon icon={faCartShopping} />
                                                <span>{order?.orderItems?.length}</span>
                                                <span>Giỏ hàng</span>
                                            </Link>
                                        </div>
                                        <div className="cart__content">
                                            <ul id="cart__sidebar">
                                                <div className="no__item">
                                                    <p>Không có sản phẩm nào</p>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="account__header float-end">
                                    {user.access_token ? (
                                        <div className="user__box">
                                            <a href="true" className="acount__login">
                                                <FontAwesomeIcon icon={faUser} />
                                                {user.email}
                                            </a>
                                            <ul className="action__user">
                                                {user?.isAdmin ? (
                                                    <li>
                                                        <Link to={'/system/admin'}>Quản lý hệ thống</Link>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <Link to={'/profile'}>Thông tin người dùng</Link>
                                                    </li>
                                                )}
                                                <li onClick={handleLogout}>Đăng xuất</li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <>
                                            <Link to="/sign-in">
                                                <FontAwesomeIcon icon={faUser} />
                                                <span>Đăng nhập</span>
                                            </Link>
                                            <Link to="/sign-up">
                                                <FontAwesomeIcon icon={faLockOpen} />
                                                <span>Đăng ký</span>
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="search__box">
                                    <div className="header__search">
                                        <div className="search__form">
                                            <input
                                                id="search"
                                                type="text"
                                                value={valueSearch}
                                                placeholder="Tìm kiếm..."
                                                // onKeyDown={handleKeyDown}
                                                onChange={handleOnChange}
                                            />
                                            <span className="input__group--btn">
                                                <button className="btn" onClick={handleSearch}>
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="phone__header">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <a href="true">1900 6750</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="header__menu">
                <Container>
                    <Row>
                        <ul className="menu__list">
                            <li className="menu__item">
                                <Link to={'/'}>Trang Chủ</Link>
                            </li>
                            <li className="menu__item">
                                <Link to={'/introduce'}>Giới Thiệu</Link>
                            </li>
                            <li className="menu__item" onClick={() => handleNavigateType('Sản phẩm')}>
                                Sản Phẩm
                            </li>
                            <li className="menu__item">Tin Tức</li>
                            <li className="menu__item">Bản Đồ</li>
                            <li className="menu__item">Liên Hệ</li>
                        </ul>
                    </Row>
                </Container>
            </div>
        </header>
    );
}

export default Header;
