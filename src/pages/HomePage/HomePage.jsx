import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import banner1 from '../../assets/images/banner/banner1.webp';
import banner2 from '../../assets/images/banner/banner2.webp';
import Banner from '../../components/BannerComponent/Banner';
import Card from '../../components/CardComponent/Card';
import TitleComponent from '../../components/TitleComponent/TitleComponent';
import './styles.scss';
// import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from 'react-query';
import productApi from '../../api/productApi';
import Loading from '../../components/LoadingComponent/Loading';

function HomePage() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const fetchProductAll = async () => {
        const res = await productApi.getAllProduct();
        return res;
    };
    const fetchProductSale = async () => {
        const res = await productApi.getProductHome('sale');
        return res;
    };
    const fetchProductSelled = async () => {
        const res = await productApi.getProductHome('selled');
        return res;
    };

    const { data: products, isLoading } = useQuery(['products'], fetchProductAll);
    const { data: productSale, isLoading: isLoadingSale } = useQuery(['products-sale'], fetchProductSale);
    const { data: productSelled, isLoading: isLoadingSelled } = useQuery(['products-selled'], fetchProductSelled);

    return (
        <>
            <section className="section__product--new">
                <TitleComponent title="Sản phẩm" href="san-pham-moi" />
                <Loading isLoading={isLoading}>
                    <Slider {...settings} className="slick__product">
                        {products?.data?.map((product) => (
                            <Card
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
                    </Slider>
                </Loading>
                <Banner title="Hàng mới về" src={banner1} alt="Hàng mới về" />

                <TitleComponent title="Sản phẩm khuyến mãi" href="san-pham-khuyen-mai" />
                <Loading isLoading={isLoadingSale}>
                    <Slider {...settings} className="slick__product">
                        {productSale?.data?.map((product) => (
                            <Card
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
                    </Slider>
                </Loading>
                <Banner title="Giày bé nam" src={banner2} alt="Giày bé nam" />

                <TitleComponent title="Sản phẩm mua nhiều" href="san-pham-mua-nhieu" />
                <Loading isLoading={isLoadingSelled}>
                    <Slider {...settings} className="slick__product">
                        {productSelled?.data?.map((product) => (
                            <Card
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
                    </Slider>
                </Loading>
            </section>
        </>
    );
}

export default HomePage;
