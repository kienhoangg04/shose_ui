import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productApi from '../../api/productApi';
import Card from '../../components/CardComponent/Card';
import Loading from '../../components/LoadingComponent/Loading';
import TitleComponent from '../../components/TitleComponent/TitleComponent';
import './styles.scss';

function Search() {
    const product = useSelector((state) => state.product);
    const { search } = product;

    const [stateProducts, setStateProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSearchProduct = async (search) => {
        if (search.length > 0) {
            setIsLoading(true);
            const res = await productApi.getSearchProduct(search);
            if (res?.data) {
                setStateProducts(res?.data);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchProduct(search);
    }, [search]);

    return (
        <>
            <TitleComponent
                title={`Có ${stateProducts?.length} kết quả tìm kiếm phù hợp`}
                stylediv={{ marginTop: '30px', marginBottom: '10px' }}
            />
            <Loading isLoading={isLoading}>
                <div className="product__search">
                    {stateProducts?.map((product) => (
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
        </>
    );
}

export default Search;
