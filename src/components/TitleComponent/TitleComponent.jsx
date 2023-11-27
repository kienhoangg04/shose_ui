import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

function TitleComponent(props) {
    const { title, href, stylediv } = props;
    return (
        <div className="title__main" style={stylediv}>
            <h2 className="title">
                <Link to={href}>{title}</Link>
            </h2>
        </div>
    );
}

export default TitleComponent;
