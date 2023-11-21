import React from 'react';
import './styles.scss';
import ImageCard from '../ImageCardComponent/ImageCard';
import noimg from '../../assets/images/No-Image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { convertPrice } from '../../utils';

function Card(props) {
    const { id, key, countInStock, description, image, price, price_old, rating, title, type, sale } = props;
    return (
        <div className="item__product--main" style={props.style}>
            <form action="#" className="product__form">
                <div className="product__thumbnail">
                    <Link to={`/details/${id}`} className="product__overlay" href title={title} tabIndex="0"></Link>
                    <a className="image__thumb" href title="" tabIndex="1">
                        <ImageCard src={image ? image : noimg} alt="card-1" className="image__card" />
                    </a>
                    <div className="saleright">
                        <span>-{sale}%</span>
                    </div>
                </div>
                <div className="product__info">
                    <h3 className="product__name">
                        <a href="true" title={title} tabIndex="1">
                            {title}
                        </a>
                    </h3>
                    <div className="price__box">
                        {convertPrice(price)}
                        <span className="compare__price">{convertPrice(price_old)}</span>
                    </div>
                </div>
                <div className="product__action">
                    <button className="btn__card" title="Tùy chọn">
                        Tùy chọn
                    </button>
                    <Link to={`/details/${id}`} title="Xem sản phẩm" className="view">
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Card;
