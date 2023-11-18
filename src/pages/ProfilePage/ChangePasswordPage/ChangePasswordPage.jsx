import React from 'react';
import './styles.scss';
import { Row } from 'react-bootstrap';
import InputForm from '../../../components/InputForm/InputForm';

function ChangePasswordPage() {
    return (
        <div className="change__box">
            <h1 className="title">Đổi mật khẩu</h1>
            <Row>
                <div className="col-md-6 col-12">
                    <div className="page__change">
                        <form action="" className="change__custom--password">
                            <p>Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự</p>
                            <div className="form__change">
                                <div className="form__group">
                                    <label htmlFor="">
                                        Mật khẩu cũ <span>*</span>
                                    </label>
                                    <InputForm placeholder="Mật khẩu cũ" className="input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="">
                                        Mật khẩu mới <span>*</span>
                                    </label>
                                    <InputForm placeholder="Mật khẩu mới" className="input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="">
                                        Xác nhận lại mật khẩu <span>*</span>
                                    </label>
                                    <InputForm placeholder="Xác nhận lại mật khẩu" className="input" />
                                </div>
                                <button className="button">Đặt lại mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Row>
        </div>
    );
}

export default ChangePasswordPage;
