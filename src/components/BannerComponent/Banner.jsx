import React from 'react';
import './styles.scss';

function Banner(props) {
    const { title, src, alt } = props;
    return (
        <div className="banner">
            <a href="true" title={title}>
                <img src={src} alt={alt} className="img" />
                <div className="text__hover">
                    <span>{title}</span>
                </div>
            </a>
        </div>
    );
}

export default Banner;
