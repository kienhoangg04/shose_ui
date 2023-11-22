import React from 'react';
import './styles.scss';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfilePage({ children }) {
    const user = useSelector((state) => state.user);
    return (
        <div className="profile__page">
            <Container>
                <Row>
                    <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                        <div className="account__box">
                            <h5 className="title">Trang tài khoản</h5>
                            <p>
                                Xin chào, <span>{user.username ? user.username : 'user'}</span>!
                            </p>
                            <ul>
                                <li>
                                    <Link to={'/profile'} className="info active">
                                        Thông tin tài khoản
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/profile/orders'} className="info">
                                        Đơn hàng của bạn
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/profile/changepassword'} className="info">
                                        Đổi mật khẩu
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to={'/profile/address'} className="info">
                                        Số địa chỉ
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">{children}</div>
                </Row>
            </Container>
        </div>
    );
}

export default ProfilePage;
