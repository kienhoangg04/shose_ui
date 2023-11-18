import React from 'react';
import './styles.scss';

function TitleComponent(props) {
    const { title, href, stylediv } = props;
    return (
        <div className="title__main" style={stylediv}>
            <h2 className="title">
                <a href={href}>{title}</a>
            </h2>
        </div>
    );
}

export default TitleComponent;
