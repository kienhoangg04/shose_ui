import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';

function InfoPage() {
    const user = useSelector((state) => state.user);
    return (
        <div className="info__box">
            <h1 className="title">Thông tin tài khoản</h1>
            <div className="info">
                {user.name && (
                    <p>
                        <strong>Họ tên: </strong>
                        {user.name}
                    </p>
                )}
                {user.email && (
                    <p>
                        <strong>Email: </strong>
                        {user.email}
                    </p>
                )}
                {user.phone && (
                    <p>
                        <strong>Điện thoại: </strong>
                        {user.phone}
                    </p>
                )}
                {user.dateOfBirth && (
                    <p>
                        <strong>Ngày sinh: </strong>
                        {user.dateOfBirth}
                    </p>
                )}
                {user.address && (
                    <p>
                        <strong>Địa chỉ: </strong>
                        {user.address}
                    </p>
                )}
            </div>
        </div>
    );
}

export default InfoPage;
