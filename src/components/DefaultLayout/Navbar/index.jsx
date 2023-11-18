import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import imgBanner from '../../../assets/images/banner/banner-qc.webp';
import textBanner from '../../../assets/images/banner/text-banner.webp';
import imgContact from '../../../assets/images/contact/feature1.webp';
import ImageComponent from '../../ImageCardComponent/ImageCard';
import TypeProduct from '../../TypeProduct/TypeProduct';
import './styles.scss';

function Navbar() {
    const [typeProducts, setTypeProducts] = useState([]);

    const fetchAllTypeProduct = async () => {
        const res = await productApi.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res.data);
        }
    };

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    return (
        <div className="sidebar">
            <div className="wrap_background_aside">
                <div className="aside__item">
                    <div className="aside__title">
                        <h2 className="title__head">
                            <span>Danh mục sản phẩm</span>
                        </h2>
                    </div>
                    <div className="aside__content">
                        <div className="nav__category">
                            <ul className="nav">
                                {typeProducts.map((item) => {
                                    return <TypeProduct name={item} key={item} />;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="aside__item aside__contact">
                    <div className="content__contact">
                        <div className="contact__left">
                            <ImageComponent src={imgContact} alt={'contact'} />
                        </div>
                        <div className="contact__right">
                            <span>Hỗ trợ trực tuyến</span>
                            <a href="tel:19006750">1900 6750</a>
                        </div>
                    </div>
                </div>
                <div className="aside__item aside__banner">
                    <a href="true" title="Banner" className="banner">
                        <ImageComponent src={imgBanner} alt={'banner'} className="w-100" />
                        <div className="image__hover">
                            <ImageComponent src={textBanner} alt={'text-banner'} />
                        </div>
                    </a>
                </div>
                <div className="aside__item"></div>
                <div className="aside__item"></div>
            </div>
        </div>
    );
}

export default Navbar;
