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

function SignUpPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
        });
    };

    //
    const handleOnChangeUsername = (value) => {
        setUsername(value);
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

    return (
        <div className="signup__box">
            <div className="signup__form">
                <h2>Đăng ký</h2>
                <Link to="/sign-in">Đã có tài khoản?</Link>

                <div>
                    <div>
                        <span>Username</span>
                        <InputForm
                            placeholder="Username"
                            type="text"
                            value={username}
                            handleOnChange={handleOnChangeUsername}
                            className="input"
                        />
                    </div>

                    <div>
                        <span>Email</span>
                        <InputForm
                            placeholder="Email"
                            type="text"
                            value={email}
                            handleOnChange={handleOnChangeEmail}
                            className="input"
                        />
                    </div>
                    <div>
                        <span>Mật khẩu</span>
                        <InputForm
                            placeholder="Mật khẩu"
                            type={isShowPassword ? 'text' : 'password'}
                            value={password}
                            handleOnChange={handleOnChangePassword}
                            className="input"
                        />
                        <span onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </span>
                    </div>

                    <div>
                        <span>Nhập lại mật khẩu</span>
                        <InputForm
                            placeholder="Nhập lại mật khẩu"
                            type={isShowRePassword ? 'text' : 'password'}
                            value={repassword}
                            handleOnChange={handleOnChangeRepassword}
                            className="input"
                        />
                        <span onClick={() => setIsShowRePassword(!isShowRePassword)}>
                            {isShowRePassword ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                    </div>
                    {data?.status === 'ERR' && <span>{data?.message}</span>}
                    <br />
                    <Loading isLoading={isLoading}>
                        <button onClick={handleSignUp}>Đăng ký</button>
                    </Loading>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
