import React from 'react';
import './styles.scss';

function ImageCard(props) {
    return <img src={props.src} alt={props.alt} {...props} style={props.style} />;
}

export default ImageCard;
