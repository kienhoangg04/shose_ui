import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function TypeProduct({ name }) {
    const navigate = useNavigate();
    const handleNavigateType = (type) => {
        navigate(
            `/product/${type
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/ /g, '_')}`,
            {
                state: type,
            },
        );
    };
    return (
        <li className="nav__item active" onClick={() => handleNavigateType(name)}>
            <span className="nav__link">{name}</span>
            <FontAwesomeIcon icon={faAngleRight} />
        </li>
    );
}

export default TypeProduct;
