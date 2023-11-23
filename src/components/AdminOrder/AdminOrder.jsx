import React from 'react';
import TitleComponent from '../TitleComponent/TitleComponent';
import './styles.scss';

function AdminOrder() {
    return (
        <div>
            <TitleComponent title="Trang Quản Lý Đơn Hàng" stylediv={{ marginTop: '20px' }} />
        </div>
    );
}

export default AdminOrder;
