import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import { useMutationHook } from '../../hooks/useMutationHook';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';
import * as message from '../Message/Message';
import ModalComponent from '../ModalComponent/ModalComponent';
import TableComponent from '../TableComponent/TableComponent';
import TitleComponent from '../TitleComponent/TitleComponent';
import './styles.scss';

function AdminUser() {
    const user = useSelector((state) => state.user);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState('');

    const [stateUserDetails, setStateUserDetails] = useState({
        username: '',
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
        address: '',
    });
    const [form] = Form.useForm();

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = userApi.update(id, token, { ...rests });
        return res;
    });
    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        const res = userApi.remove(id, token);
        return res;
    });
    const mutationDeleteMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = userApi.deleteManyUser(token, ids);
        return res;
    });

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

    //
    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await userApi.get(rowSelected, user?.access_token);
        if (res?.data) {
            setStateUserDetails({
                username: res?.data.username,
                name: res?.data?.name,
                email: res?.data.email,
                isAdmin: res?.data.isAdmin,
                phone: res?.data.phone,
                address: res?.data.address,
            });
        }
        return res;
    };

    //
    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);
    //
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailsUser = () => {
        setIsOpenDrawer(true);
    };
    const handleDeleteUser = () => {
        setIsModalOpenDelete(true);
    };
    //
    const renderAction = () => {
        return (
            <div style={{ display: 'flex' }}>
                <DeleteOutlined
                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer', marginRight: '6px' }}
                    onClick={handleDeleteUser}
                />
                <EditOutlined
                    style={{ fontSize: '20px', color: '#35c0c5', cursor: 'pointer' }}
                    onClick={handleDetailsUser}
                />
            </div>
        );
    };
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            sorter: (a, b) => a.username.length - b.username.length,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    // getallproduct
    const getAllUsers = async () => {
        const res = await userApi.getAll(user?.access_token);
        return res;
    };
    const queryUser = useQuery(['users'], getAllUsers);
    const { data: users, isLoading: isLoadingUser } = queryUser;

    //
    const dataTable =
        users?.data?.length &&
        users?.data.map((user) => {
            return { ...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'False' };
        });

    //
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success('Update thành công!');
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error('Update thất bại!');
        }
    }, [isSuccessUpdated]);
    //
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Delete thành công!');
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error('Delete thất bại!');
        }
    }, [isSuccessDeleted]);
    //
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success('Delete thành công!');
        } else if (isErrorDeletedMany) {
            message.error('Delete thất bại!');
        }
    }, [isSuccessDeletedMany]);

    const handleOkDelete = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };
    const handleDeleteManyUser = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    //
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            username: '',
            name: '',
            email: '',
            isAdmin: false,
            phone: '',
            address: '',
        });
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    // const handleOnChangeAvatarDetails = async ({ fileList }) => {
    //     const file = fileList[0];
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setStateUserDetails({
    //         ...stateUserDetails,
    //         image: file.preview,
    //     });
    // };

    //
    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    return (
        <div>
            <TitleComponent title="Quản lý người dùng" href="quan-ly-nguoi-dung" stylediv={{ marginTop: '20px' }} />

            <div>
                <TableComponent
                    loading={isLoadingUser}
                    dataTable={dataTable}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                    handleDeleteMany={handleDeleteManyUser}
                />
            </div>
            <DrawerComponent
                title="Chi tiết người dùng"
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
                    onFinish={onUpdateUser}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        labelAlign="left"
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateUserDetails.username}
                            onChange={handleOnChangeDetails}
                            name="username"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
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
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                    {/* <Form.Item
                        labelAlign="left"
                        label="DateOfBirth"
                        name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your dateOfBirth!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateUserDetails.dateOfBirth}
                            onChange={handleOnChangeDetails}
                            name="dateOfBirth"
                        />
                    </Form.Item> */}
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
                            value={stateUserDetails.address}
                            onChange={handleOnChangeDetails}
                            name="address"
                        />
                    </Form.Item>

                    {/* <Form.Item
                        labelAlign="left"
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
                            },
                        ]}
                    >
                        <Upload onChange={handleOnChangeAvatarDetails} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        {stateUserDetails?.image && (
                            <img
                                src={stateUserDetails?.image}
                                alt="product"
                                style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        )}
                    </Form.Item> */}

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
                <div>Bạn có chắc chắn xóa tài khoản này không?</div>
            </ModalComponent>
        </div>
    );
}

export default AdminUser;
