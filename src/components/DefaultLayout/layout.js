import React from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Crum from '../CrumComponent/Crum';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const { pathname } = useLocation();
    const category = pathname.split('/')[2];
    return (
        <>
            <Header />
            <Crum title={category} to={`product/${category}`} />
            <Content children={children} />
            <Footer />
        </>
    );
}

export default Layout;
