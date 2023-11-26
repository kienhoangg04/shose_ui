import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import productApi from '../../api/productApi';
import { useMutationHook } from '../../hooks/useMutationHook';
import { convertPrice, getBase64, renderOptions } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';
import * as message from '../Message/Message';
import ModalComponent from '../ModalComponent/ModalComponent';
import TableComponent from '../TableComponent/TableComponent';
import TitleComponent from '../TitleComponent/TitleComponent';
import './styles.scss';

function AdminProduct() {
    const user = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const initial = () => ({
        title: '',
        type: '',
        price: '',
        price_old: '',
        countInStock: '',
        rating: '',
        description: '',
        image: '',
        sale: '',
        newType: '',
    });
    const [stateProduct, setStateProduct] = useState(initial());
    const [stateProductDetails, setStateProductDetails] = useState(initial());
    const [form] = Form.useForm();

    //
    const mutation = useMutationHook((data) => {
        const { title, image, type, price, price_old, countInStock, rating, description, sale } = data;
        const percentSale = (((price_old - price) / price_old) * 100).toFixed(0);
        const res = productApi.createProduct({
            title,
            image,
            type,
            price,
            price_old,
            countInStock,
            rating,
            description,
            sale: percentSale,
            quantity: countInStock,
        });
        return res;
    });
    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const percentSale = (((data.price_old - data.price) / data.price_old) * 100).toFixed(0);
        const res = productApi.updateProduct(id, token, { ...rests, sale: percentSale });
        return res;
    });
    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        const res = productApi.deleteProduct(id, token);
        return res;
    });
    const mutationDeleteMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        const res = productApi.deleteManyProduct(token, ids);
        return res;
    });

    const { data, isSuccess, isError } = mutation;
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;
    //
    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await productApi.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                title: res?.data.title,
                type: res?.data.type,
                price: res?.data.price,
                price_old: res?.data.price_old,
                countInStock: res?.data.countInStock,
                rating: res?.data.rating,
                description: res?.data.description,
                image: res?.data.image,
                sale: res?.data.sale,
            });
        }
        return res;
    };

    //
    const fetchAllTypeProduct = async () => {
        const res = await productApi.getAllTypeProduct();
        return res;
    };

    //
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetails);
        } else {
            form.setFieldsValue(initial());
        }
    }, [form, stateProductDetails, isModalOpen]);
    //
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsProduct(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true);
    };
    const handleDeleteProduct = () => {
        setIsModalOpenDelete(true);
    };
    //
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer', marginRight: '6px' }}
                    onClick={handleDeleteProduct}
                />
                <EditOutlined
                    style={{ fontSize: '20px', color: '#35c0c5', cursor: 'pointer' }}
                    onClick={handleDetailsProduct}
                />
            </div>
        );
    };
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Prire old',
            dataIndex: 'price_old',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Count In Stock',
            dataIndex: 'countInStock',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Selled',
            dataIndex: 'selled',
        },
        {
            title: 'Sale',
            dataIndex: 'sale',
            sorter: (a, b) => a.sale - b.sale,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    // getallproduct
    const getAllProducts = async () => {
        const res = await productApi.getAllProduct();
        return res;
    };
    const queryProduct = useQuery(['products'], getAllProducts);
    const queryTypeProduct = useQuery(['type-product'], fetchAllTypeProduct);
    const { data: products } = queryProduct;
    const { data: typeProduct } = queryTypeProduct;

    //
    const dataTable =
        products?.data?.length &&
        products?.data.map((product) => {
            return {
                ...product,
                key: product._id,
                price: convertPrice(product?.price),
                price_old: convertPrice(product?.price_old),
            };
        });

    //
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            handleCancel();
            message.success('Thêm mới thành công!');
        } else if (isError) {
            message.error('Thêm mới thất bại!');
        }
    }, [isSuccess]);
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

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        onFinish();
    };
    const handleOkDelete = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };
    const handleDeleteManyProduct = (ids) => {
        mutationDeleteMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            title: '',
            type: '',
            price: '',
            price_old: '',
            countInStock: '',
            rating: '',
            description: '',
            image: '',
            sale: '',
        });
        form.resetFields();
    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    //
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            title: '',
            type: '',
            price: '',
            price_old: '',
            countInStock: '',
            rating: '',
            description: '',
            image: '',
            sale: '',
        });
        form.resetFields();
    };

    // create
    const onFinish = (values) => {
        const params = {
            title: stateProduct.title,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            price: stateProduct.price,
            price_old: stateProduct.price_old,
            countInStock: stateProduct.countInStock,
            rating: stateProduct.rating,
            description: stateProduct.description,
            image: stateProduct.image,
            sale: stateProduct.sale,
        };

        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    //
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };
    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
    };

    //
    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetails },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    //
    const handleChangeSelected = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };

    return (
        <div>
            <TitleComponent title="Quản lý sản phẩm" href="quan-ly-san-pham" stylediv={{ marginTop: '20px' }} />
            <div>
                <button className="btn__add" onClick={showModal}>
                    Thêm sản phẩm
                </button>
            </div>
            <div>
                <TableComponent
                    dataTable={dataTable}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                    handleDeleteMany={handleDeleteManyProduct}
                />
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        labelAlign="left"
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.title} onChange={handleOnChange} name="title" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your type!',
                            },
                        ]}
                    >
                        <Select
                            name="type"
                            // defaultValue="lucy"
                            value={stateProduct.type}
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChangeSelected}
                            options={renderOptions(typeProduct?.data)}
                        />
                    </Form.Item>
                    {stateProduct.type === 'add_type' && (
                        <Form.Item
                            labelAlign="left"
                            label="Add Type"
                            name="newType"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                        </Form.Item>
                    )}
                    <Form.Item
                        labelAlign="left"
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Price_old"
                        name="price_old"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price old!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price_old} onChange={handleOnChange} name="price_old" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="CountInStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your count in stock!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProduct.countInStock}
                            onChange={handleOnChange}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                    </Form.Item>
                    {/* <Form.Item
                        labelAlign="left"
                        label="Sale"
                        name="sale"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your sale!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.sale} onChange={handleOnChange} name="sale" />
                    </Form.Item> */}
                    <Form.Item
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
                        <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        {stateProduct?.image && (
                            <img
                                src={stateProduct?.image}
                                alt="product"
                                style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        )}
                    </Form.Item>

                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>
            </ModalComponent>
            <DrawerComponent
                title="Chi tiết sản phẩm"
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
                    onFinish={onUpdateProduct}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        labelAlign="left"
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.title}
                            onChange={handleOnChangeDetails}
                            name="title"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your type!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.price}
                            onChange={handleOnChangeDetails}
                            name="price"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Price_old"
                        name="price_old"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price old!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.price_old}
                            onChange={handleOnChangeDetails}
                            name="price_old"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="CountInStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your count in stock!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.countInStock}
                            onChange={handleOnChangeDetails}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.rating}
                            onChange={handleOnChangeDetails}
                            name="rating"
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign="left"
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <InputComponent
                            value={stateProductDetails.description}
                            onChange={handleOnChangeDetails}
                            name="description"
                        />
                    </Form.Item>
                    {/* <Form.Item
                        labelAlign="left"
                        label="Sale"
                        name="sale"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your sale!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.sale} onChange={handleOnChangeDetails} name="sale" />
                    </Form.Item> */}
                    <Form.Item
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
                        {stateProductDetails?.image && (
                            <img
                                src={stateProductDetails?.image}
                                alt="product"
                                style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent
                forceRender
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onOk={handleOkDelete}
                onCancel={handleCancelDelete}
            >
                <div>Bạn có chắc chắn xóa sản phẩm này không?</div>
            </ModalComponent>
        </div>
    );
}

export default AdminProduct;
