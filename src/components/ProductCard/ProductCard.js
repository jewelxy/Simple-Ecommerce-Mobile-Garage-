import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = (props) => {
    const { _id, pdName, pdPrice, pdPhoto } = props.product;

    return (
        <div className="product__card">
            <div className="product__img--box">
                <img src={pdPhoto} alt={pdName} className="product__img object-contain" />
            </div>
            <h3 className="product__name">{pdName}</h3>
            <div className="product__bottom">
                <h2 className="product__price">${pdPrice}</h2>
                <Link className="btn btn__primary" to={`/checkout/${_id}`}>Buy now</Link>
            </div>
        </div>
    );
};

export default ProductCard;