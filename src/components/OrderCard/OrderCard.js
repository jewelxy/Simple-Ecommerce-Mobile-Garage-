import React, { useEffect, useState } from 'react';
import './OrderCard.css';
import Delete from '../../img/icon/delete.png';

const OrderCard = (props) => {
    const { order, loadOrders } = props;
    const { _id, pdId, pdQuantity } = order;
    const [product, setProduct] = useState({});
    const { pdName, pdPrice, pdPhoto } = product;

    useEffect(() => {
        fetch(`https://ph-mobile-garage.herokuapp.com/product/${pdId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [pdId]);

    const handleCancelOrder = () => {
        fetch(`https://ph-mobile-garage.herokuapp.com/cancelOrder/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadOrders();
                }
            });
    };

    return (
        <div className="order__card">
            <div className="order__img--box">
                <img src={pdPhoto} alt={pdName} className="order__img object-contain" />
            </div>
            <h2 className="order__name">{pdName}</h2>
            <h2 className="order__quantity">QT {pdQuantity}</h2>
            <h2 className="order__price">${pdPrice}</h2>
            <button className="order__delete" onClick={handleCancelOrder}>
                <img className="object-cover" src={Delete} alt="Delete" />
            </button>
        </div>
    );
};

export default OrderCard;