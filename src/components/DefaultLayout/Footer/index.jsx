import {
    faEnvelope,
    faLaptop,
    faLocationDot,
    faPhone,
    faHashtag,
    faVrCardboard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../../assets/images/footer/logo-footer.webp';
import Image from '../../ImageComponent/Image';
import './styles.scss';

function Footer() {
    return (
        <footer className="footer">
            <div className="mid__footer">
                <Container>
                    <Row>
                        <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <div className="section">
                                <div className="blocklogo">
                                    <Image src={logo} alt="logo" />
                                </div>
                                <div className="list__footer">
                                    <div className="item__footer">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        <span>Tầng 6, tòa nhà Ladeco, 266 Đội Cấn, Hà Nội, Việt Nam, Hà Nội</span>
                                    </div>
                                    <div className="item__footer">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <a href="tel:19006750">1900 6750</a>
                                    </div>
                                    <div className="item__footer">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <a href="mailto:kienhoangg0403@gmail.com">kienhoangg0403@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <h4 className="title__menu">
                                <a href="true">Về chúng tôi</a>
                            </h4>
                            <div className="menu">
                                <ul className="list__menu">
                                    <li className="item__menu">Trang chủ</li>
                                    <li className="item__menu">Giới thiệu</li>
                                    <li className="item__menu">Sản phẩm</li>
                                    <li className="item__menu">Tin tức</li>
                                    <li className="item__menu">Bản đồ</li>
                                    <li className="item__menu">Liên hệ</li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <h4 className="title__menu">
                                <a href="true">Dịch vụ</a>
                            </h4>
                            <div className="menu">
                                <ul className="list__menu">
                                    <li className="item__menu">Trang chủ</li>
                                    <li className="item__menu">Giới thiệu</li>
                                    <li className="item__menu">Sản phẩm</li>
                                    <li className="item__menu">Tin tức</li>
                                    <li className="item__menu">Bản đồ</li>
                                    <li className="item__menu">Liên hệ</li>
                                </ul>
                            </div>
                        </Col>
                        <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                            <h4 className="title__menu">
                                <a href="true">Liên hệ</a>
                            </h4>
                            <div className="menu">
                                <ul className="list__menu">
                                    <li className="item__menu">Trang chủ</li>
                                    <li className="item__menu">Giới thiệu</li>
                                    <li className="item__menu">Sản phẩm</li>
                                    <li className="item__menu">Tin tức</li>
                                    <li className="item__menu">Bản đồ</li>
                                    <li className="item__menu">Liên hệ</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bottom__footer">
                <Container>
                    <div className="inner">
                        <div className="row">
                            <div id="copyright" className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                                <span className="wsp">
                                    <span className="mobile">© Bản quyền thuộc về </span>
                                    <b>Avent team</b>
                                    <span> | </span>
                                </span>
                                <span className="wsp1">Cung cấp bởi</span>
                                <a href="https://www.facebook.com/hoangg.kien.77">KienHoang</a>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                <div className="social__footer">
                                    <ul className="follow__option">
                                        <li>
                                            <span>Follow us</span>
                                        </li>
                                        <li>
                                            <a href="true">
                                                <FontAwesomeIcon icon={faLaptop} />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="true">
                                                <FontAwesomeIcon icon={faHashtag} />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="true">
                                                <FontAwesomeIcon icon={faVrCardboard} />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="true">
                                                <FontAwesomeIcon icon={faLaptop} />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="true">
                                                <FontAwesomeIcon icon={faLaptop} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
