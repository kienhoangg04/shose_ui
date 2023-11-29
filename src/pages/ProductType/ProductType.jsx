import { Pagination } from 'antd';
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
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 9,
        total: 1,
    });
    const fetchProductType = async (type, page, limit) => {
        setIsLoading(true);
        let res = {};
        if (type === 'Sản phẩm') {
            res = await productApi.getAllProduct(page, limit);
        } else {
            res = await productApi.getProductType(type, page, limit);
        }
        if (res?.status === 'OK') {
            setProducts(res?.data);
            setPanigate({ ...panigate, total: res?.total });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, pageSize: pageSize });
    };

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
            <div className="pagination">
                <Pagination defaultCurrent={panigate?.page + 1} total={panigate?.total} onChange={onChange} />
            </div>
        </Loading>
    );
}

export default ProductType;
