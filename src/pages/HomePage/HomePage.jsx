import React from 'react';
import { Row } from 'react-bootstrap';
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

function HomePage() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    let settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const fetchProductAll = async () => {
        const res = await productApi.getAllProduct();
        return res;
    };
    const { data: products } = useQuery(['products'], fetchProductAll);

    return (
        <>
            <section className="section__product--new">
                <TitleComponent title="Sản phẩm" href="san-pham-moi" />
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
                <Banner title="Hàng mới về" src={banner1} alt="Hàng mới về" />

                <TitleComponent title="Sản phẩm khuyến mãi" href="san-pham-khuyen-mai" />
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
                <Banner title="Giày bé nam" src={banner2} alt="Giày bé nam" />

                <div>
                    <Row>
                        <div className="col-lg-4">
                            <TitleComponent title="Sản phẩm nổi bật" href="san-pham-noi-bat" />
                            <Slider {...settings2} className="slick__product">
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
                        </div>
                        <div className="col-lg-8">
                            <TitleComponent title="Sản phẩm mua nhiều" href="san-pham-mua-nhieu" />
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
                        </div>
                    </Row>
                </div>
            </section>
        </>
    );
}

export default HomePage;
