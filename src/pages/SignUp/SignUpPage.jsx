import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import InputForm from '../../components/InputForm/InputForm';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/useMutationHook';
import './styles.scss';
import { Col, Container, Row } from 'react-bootstrap';

function SignUpPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowRePassword, setIsShowRePassword] = useState(false);

    //
    const mutation = useMutationHook((data) => userApi.add(data));
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success('Đăng ký thành công!');
            navigate('/sign-in');
        } else if (isError && data?.status === 'ERR') {
            message.error('Đăng ký thất bại!');
        }
    }, [isSuccess, isError]);

    const handleSignUp = () => {
        mutation.mutate({
            username,
            password,
            email,
            confirmPassword: repassword,
            phone,
            name,
        });
    };

    //
    const handleOnChangeUsername = (value) => {
        setUsername(value);
    };
    const handleOnChangeName = (value) => {
        setName(value);
    };
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangePassword = (value) => {
        setPassword(value);
    };
    const handleOnChangeRepassword = (value) => {
        setRepassword(value);
    };
    const handleOnChangePhone = (value) => {
        setPhone(value);
    };

    const navigateSignIn = () => {
        navigate('/sign-in');
    };

    return (
        <Container>
            <div className="signup">
                <Row>
                    <div className="signup__head">
                        <h2 className="title">Thông tin đăng ký</h2>
                    </div>
                </Row>
                <Row>
                    <Col xs={6}>
                        <div className="signup__form">
                            <div className="input__form">
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
                            <div className="input__form pass">
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

                            <div className="input__form repass">
                                <span>Nhập lại mật khẩu</span>
                                <strong>*</strong>
                                <InputForm
                                    placeholder="Nhập lại mật khẩu"
                                    type={isShowRePassword ? 'text' : 'password'}
                                    value={repassword}
                                    handleOnChange={handleOnChangeRepassword}
                                    className="input"
                                />
                                <span
                                    onClick={() => setIsShowRePassword(!isShowRePassword)}
                                    className="show__repassword"
                                >
                                    {isShowRePassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>
                            {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                            <br />
                            <Loading isLoading={isLoading}>
                                <button onClick={handleSignUp} className="btn__signup">
                                    Đăng ký
                                </button>
                                <span>hoặc</span>
                                <button onClick={navigateSignIn} className="btn__signin">
                                    Đăng nhập
                                </button>
                            </Loading>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="signup__form">
                            <div className="input__form">
                                <span>Username</span>
                                <strong>*</strong>
                                <InputForm
                                    placeholder="Username"
                                    type="text"
                                    value={username}
                                    handleOnChange={handleOnChangeUsername}
                                    className="input"
                                />
                            </div>
                            <div className="input__form">
                                <span>Họ và tên</span>
                                <strong>*</strong>
                                <InputForm
                                    placeholder="Họ và tên"
                                    type="text"
                                    value={name}
                                    handleOnChange={handleOnChangeName}
                                    className="input"
                                />
                            </div>
                            <div className="input__form">
                                <span>Phone</span>
                                <strong>*</strong>
                                <InputForm
                                    placeholder="Phone"
                                    type="text"
                                    value={phone}
                                    handleOnChange={handleOnChangePhone}
                                    className="input"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default SignUpPage;
