import React from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
    return (
        <>
            <Header />
            <Content children={children} />
            <Footer />
        </>
    );
}

export default Layout;
