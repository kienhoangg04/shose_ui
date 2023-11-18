import React from 'react';
import './styles.scss';

function Image(props) {
    return (
        <div className="slider__home">
            <img src={props.src} alt={props.alt} {...props} />
        </div>
    );
}

export default Image;
