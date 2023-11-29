import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cardApi from '../../api/cardApi';
import userApi from '../../api/userApi';
import InputForm from '../../components/InputForm/InputForm';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/useMutationHook';
import { updateOrder } from '../../redux/slides/orderSlides';
import { updateUser } from '../../redux/slides/userSlides';
import './styles.scss';

function SignInPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    //
    const mutation = useMutationHook((data) => userApi.login(data));
    const { data, isLoading, isSuccess } = mutation;

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            if (location?.state) {
                navigate(location?.state);
            } else {
                navigate('/');
            }
            message.success('Đăng nhập thành công!');
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                    handleGetCard(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    //
    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storage);
        const res = await userApi.get(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    };

    //
    const handleGetCard = async (id, token) => {
        const res = await cardApi.getAllCard(token, id);
        dispatch(updateOrder({ ...res?.data }));
    };

    //
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    return (
        <Container>
            <div className="signin">
                <Row>
                    <Col xs={6}>
                        <div className="signin__form">
                            <h2 className="title">Đăng nhập tài khoản</h2>
                            <div className="input_form">
                                <span>Email</span>
                                <strong>*</strong>
                                <InputForm
                                    placeholder="Email"
                                    type="text"
                                    value={email}
                                    handleOnChange={handleOnChangeEmail}
                                    className="input"
                                />
                            </div>
                            <div className="input_form pass">
                                <span>Mật khẩu</span>
                                <strong>*</strong>
                                <InputForm
                                    placeholder="Mật khẩu"
                                    type={isShowPassword ? 'text' : 'password'}
                                    value={password}
                                    handleOnChange={handleOnChangePassword}
                                    className="input"
                                />
                                <span onClick={() => setIsShowPassword(!isShowPassword)} className="show__password">
                                    {isShowPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>
                            {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                            <br />
                            <div className="forget__password">
                                <button className="btn__forget">Quên mật khẩu?</button>
                            </div>
                            <Loading isLoading={isLoading}>
                                <div className="login">
                                    <button onClick={handleSignIn} className="btn__login">
                                        Đăng nhập
                                    </button>
                                </div>
                            </Loading>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="form__style">
                            <h2 className="title">Bạn chưa có tài khoản</h2>
                            <div className="info">
                                <p>Đăng ký tài khoản để mua hàng nhanh hơn. Theo dõi đơn đặt hàng, vận chuyển.</p>
                                <p>Cập nhật các tin tức sự kiện và các chương trình giảm giá của chúng tôi.</p>
                            </div>
                            <Link to="/sign-up" className="acount__link">
                                <button className="btn__acount">Đăng ký</button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default SignInPage;
