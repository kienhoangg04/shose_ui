import { AppstoreOutlined, UserOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import TitleComponent from '../../components/TitleComponent/TitleComponent';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Quản lý người dùng', 'user', <UserOutlined />),
    getItem('Quản lý sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Quản lý đơn hàng', 'order', <ShoppingCartOutlined />),
    getItem('Trang người dùng', 'view', <EyeOutlined />),
];

function AdminPage() {
    const navigate = useNavigate();
    const [keySelected, setKeySelected] = useState('');

    //
    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            case 'order':
                return <AdminOrder />;
            case 'view':
                return navigate('/');
            default:
                return (
                    <>
                        <TitleComponent title="Trang Admin" stylediv={{ marginTop: '20px' }} />
                    </>
                );
        }
    };

    return (
        <div>
            <Row style={{ margin: '0' }}>
                <Col xs lg={3}>
                    <Menu
                        mode="inline"
                        style={{
                            width: '100%',
                        }}
                        items={items}
                        onClick={handleOnClick}
                    />
                </Col>
                <Col xs lg={9}>
                    <div>{renderPage(keySelected)}</div>
                </Col>
            </Row>
        </div>
    );
}

export default AdminPage;
