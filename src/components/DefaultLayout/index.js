import React from 'react';
import slider from '../../assets/images/banner/slider_1.webp';
import Image from '../ImageComponent/Image';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

function index({ children }) {
    return (
        <>
            <Header />
            <Image src={slider} alt="slider" style={{ maxWidth: '100%' }} />
            <Content children={children} />
            <Footer />
        </>
    );
}

export default index;
