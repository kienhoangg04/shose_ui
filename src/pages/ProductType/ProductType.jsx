import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productApi from '../../api/productApi';
import Card from '../../components/CardComponent/Card';
import Loading from '../../components/LoadingComponent/Loading';
import './styles.scss';

function ProductType() {
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchProductType = async (type) => {
        setIsLoading(true);
        let res = {};
        if (type === 'Sản phẩm') {
            res = await productApi.getAllProduct();
        } else {
            res = await productApi.getProductType(type);
        }
        if (res?.status === 'OK') {
            setProducts(res?.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state);
        }
    }, [state]);

    return (
        <Loading isLoading={isLoading}>
            <div className="product__type">
                {products?.map((product) => (
                    <Card
                        style={{ width: '33%' }}
                        key={product._id}
                        id={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        price_old={product.price_old}
                        rating={product.rating}
                        title={product.title}
                        type={product.type}
                        sale={product.sale}
                    />
                ))}
            </div>
        </Loading>
    );
}

export default ProductType;
