import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import orderApi from '../../api/orderApi';
import * as message from '../../components/Message/Message';
import { orderContant } from '../../contant';
import { useMutationHook } from '../../hooks/useMutationHook';
import { convertPrice, renderOptionisDelivered, renderOptionisPaid } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import TableComponent from '../TableComponent/TableComponent';
import TitleComponent from '../TitleComponent/TitleComponent';
import PieChartComponent from './PieChart';
import './styles.scss';

function AdminOrder() {
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [stateOrderDetails, setStateOrderDetails] = useState({
        fullname: '',
        phone: '',
        address: '',
        paymentMethod: '',
        totalPrice: '',
        isPaid: '',
        isDelivered: '',
    });

    const getOrder = async () => {
        const res = await orderApi.getAllOrder(user?.access_token);
        return res;
    };

    const queryOrder = useQuery(['orders'], getOrder);
    const { data: orders, isLoading: isLoadingOrder } = queryOrder;

    const mutationDeleteMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = orderApi.deleteManyOrder(token, ids);
        return res;
    });
    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        const res = orderApi.remove(id, token);
        return res;
    });
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = orderApi.update(id, token, { ...rests });
        return res;
    });

    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;

    //
    const fetchGetDetailsOrder = async (rowSelected) => {
        const res = await orderApi.getDetailsOrder(rowSelected, user?.access_token);
        if (res?.data) {
            setStateOrderDetails({
                fullname: res?.data.shippingAdress.fullname,
                phone: res?.data?.shippingAdress.phone,
                address: res?.data.shippingAdress.address,
                paymentMethod: res?.data.paymentMethod,
                totalPrice: res?.data.totalPrice,
                isPaid: res?.data.isPaid,
                isDelivered: res?.data.isDelivered,
            });
        }
        return res;
    };

    const renderAction = () => {
        return (
            <div style={{ display: 'flex' }}>
                <DeleteOutlined
                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer', marginRight: '6px' }}
                    onClick={handleDeleteOrder}
                />
                <EditOutlined
                    style={{ fontSize: '20px', color: '#35c0c5', cursor: 'pointer' }}
                    onClick={handleDetailsOrder}
                />
            </div>
        );
    };
    const columns = [
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            sorter: (a, b) => a.fullname.length - b.fullname.length,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
        },
        {
            title: 'Shipped',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    const dataTable =
        orders?.data?.length &&
        orders?.data?.map((order) => {
            return {
                ...order,
                key: order._id,
                fullname: order?.shippingAdress?.fullname,
                phone: order?.shippingAdress?.phone,
                address: order?.shippingAdress?.address,
                paymentMethod: orderContant.payment[order?.paymentMethod],
                isPaid: (order?.isPaid === 0 && 'Chưa thanh toán') || (order?.isPaid === 1 && 'Đã thanh toán'),
                isDelivered:
                    (order?.isDelivered === 0 && 'Chưa vận chuyển') ||
                    (order?.isDelivered === 1 && 'Đang vận chuyển') ||
                    (order?.isDelivered === 2 && 'Đã giao hàng'),
                totalPrice: convertPrice(order?.totalPrice),
            };
        });

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success('Delete thành công!');
        } else if (isErrorDeletedMany) {
            message.error('Delete thất bại!');
        }
    }, [isSuccessDeletedMany]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Delete thành công!');
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error('Delete thất bại!');
        }
    }, [isSuccessDeleted]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success('Update thành công!');
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error('Update thất bại!');
        }
    }, [isSuccessUpdated]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsOrder(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    useEffect(() => {
        form.setFieldsValue(stateOrderDetails);
    }, [form, stateOrderDetails]);

    const handleDeleteManyOrder = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            },
        );
    };

    const handleOkDelete = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            },
        );
    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    const handleDeleteOrder = () => {
        setIsModalOpenDelete(true);
    };

    //
    const handleDetailsOrder = () => {
        setIsOpenDrawer(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onUpdateOrder = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateOrderDetails },
            {
                onSettled: () => {
                    queryOrder.refetch();
                },
            },
        );
    };
    const handleOnChangeDetails = (e) => {
        setStateOrderDetails({
            ...stateOrderDetails,
            [e.target.name]: e.target.value,
        });
    };

    //
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateOrderDetails({
            fullname: '',
            phone: '',
            address: '',
            paymentMethod: '',
            totalPrice: '',
            isPaid: '',
            isDelivered: '',
        });
        form.resetFields();
    };

    const handleChangeSelectedIsPaid = (value) => {
        setStateOrderDetails({
            ...stateOrderDetails,
            isPaid: value,
        });
    };
    const handleChangeSelectedIsDelivered = (value) => {
        setStateOrderDetails({
            ...stateOrderDetails,
            isDelivered: value,
        });
    };

    console.log('setStateOrderDetails', stateOrderDetails);

    return (
        <div>
            <TitleComponent title="Quản Lý Đơn Hàng" stylediv={{ marginTop: '20px' }} />
            <div className="pie_chart">
                <PieChartComponent data={orders?.data} />
            </div>
            <div className="table_order">
                <TableComponent
                    dataTable={dataTable}
                    columns={columns}
                    loading={isLoadingOrder}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                    handleDeleteMany={handleDeleteManyOrder}
                />
            </div>
            <DrawerComponent
                title="Chi tiết đơn hàng"
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width={'40%'}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onUpdateOrder}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        labelAlign="left"
                        label="Fullname"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateOrderDetails.fullname}
                            onChange={handleOnChangeDetails}
                            name="fullname"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <InputComponent value={stateOrderDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateOrderDetails.address}
                            onChange={handleOnChangeDetails}
                            name="address"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Payment method"
                        name="paymentMethod"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your payment method!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateOrderDetails.paymentMethod}
                            onChange={handleOnChangeDetails}
                            name="paymentMethod"
                        />
                    </Form.Item>

                    <Form.Item
                        labelAlign="left"
                        label="Total Price"
                        name="totalPrice"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Total Price!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateOrderDetails.totalPrice}
                            onChange={handleOnChangeDetails}
                            name="totalPrice"
                        />
                    </Form.Item>

                    <Form.Item
                        labelAlign="left"
                        label="isPaid"
                        name="isPaid"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your is Paid!',
                            },
                        ]}
                    >
                        {/* <InputComponent
                            value={stateOrderDetails.isPaid}
                            onChange={handleOnChangeDetails}
                            name="isPaid"
                        /> */}
                        <Select
                            name="isPaid"
                            value={stateOrderDetails.isPaid}
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChangeSelectedIsPaid}
                            options={renderOptionisPaid([0, 1])}
                        />
                    </Form.Item>

                    <Form.Item
                        labelAlign="left"
                        label="isDelevered"
                        name="isDelivered"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your isDelevered!',
                            },
                        ]}
                    >
                        {/* <InputComponent
                            value={stateOrderDetails.isDelivered}
                            onChange={handleOnChangeDetails}
                            name="isDelivered"
                        /> */}
                        <Select
                            name="isDelivered"
                            value={stateOrderDetails.isDelivered}
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChangeSelectedIsDelivered}
                            options={renderOptionisDelivered([0, 1, 2])}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent
                forceRender
                title="Xóa người dùng"
                open={isModalOpenDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
            >
                <div>Bạn có chắc chắn xóa đơn hàng này không?</div>
            </ModalComponent>
        </div>
    );
}

export default AdminOrder;
