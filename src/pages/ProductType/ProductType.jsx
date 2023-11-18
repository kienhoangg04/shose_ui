import React, { useEffect } from 'react';
import './styles.scss';
import CardComponent from '../../components/CardComponent/Card';
import { useLocation } from 'react-router-dom';
import productApi from '../../api/productApi';

function ProductType() {
    const location = useLocation();
    console.log('location', location);

    const fetchProductType = async (type) => {
        const res = await productApi.getProductType('Convers');
        console.log('res', res);
    };

    useEffect(() => {
        fetchProductType();
    }, []);
    return (
        <div className="product__type">
            <CardComponent style={{ width: '33%' }} />
            <CardComponent style={{ width: '33%' }} />
            <CardComponent style={{ width: '33%' }} />
            <CardComponent style={{ width: '33%' }} />
            <CardComponent style={{ width: '33%' }} />
        </div>
    );
}

export default ProductType;
