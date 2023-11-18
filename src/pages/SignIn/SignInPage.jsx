import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import InputForm from '../../components/InputForm/InputForm';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/useMutationHook';
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
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    //
    const handleGetDetailsUser = async (id, token) => {
        const res = await userApi.get(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    //
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    return (
        <div className="signin__box">
            <div className="signin__form">
                <h2>Đăng nhập</h2>
                <Link to="/sign-up">Tạo tài khoản!</Link>

                <div>
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
                    {data?.status === 'ERR' && <span>{data?.message}</span>}
                    <br />
                    <Loading isLoading={isLoading}>
                        <button onClick={handleSignIn}>Đăng nhập</button>
                    </Loading>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
