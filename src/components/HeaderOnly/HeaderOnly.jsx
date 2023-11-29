import React from 'react';
import Footer from '../DefaultLayout/Footer';
import Header from '../DefaultLayout/Header';

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default HeaderOnly;
