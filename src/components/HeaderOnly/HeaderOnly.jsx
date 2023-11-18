import React from 'react';
import Footer from '../DefaultLayout/Footer';
import Header from '../DefaultLayout/Header';
import Crum from '../CrumComponent/Crum';

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <Crum title="Trang ca nhan" to="/profile" />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default HeaderOnly;
