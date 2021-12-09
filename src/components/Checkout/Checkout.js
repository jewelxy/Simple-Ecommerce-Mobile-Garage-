import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import UserContext from '../../UserContext';
import './Checkout.css';

const Checkout = () => {
    const { id } = useParams();
    const [user] = useContext(UserContext);
    const [product, setProduct] = useState({ pdQuantity: 1 });
    const { pdName, pdPrice, pdQuantity } = { ...product };
    const [checkout, setCheckout] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetch(`https://ph-mobile-garage.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct({ ...data, ...product }));
        // eslint-disable-next-line
    }, [id]);

    const handleCheckOut = () => {
        const orderInfo = { ...user, pdId: product._id, pdQuantity, orderPlaced: new Date() };

        fetch('https://ph-mobile-garage.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                setCheckout(data);
                setTimeout(() => {
                    history.push('/orders');
                }, 2000)
            })
    };

    return (
        <section className="checkout">
            <div className="container">
                <h2 className="checkout__title">Checkout</h2>
                <div className="checkout__content">
                    {
                        checkout && <p className="success">Checkout succesfull! Redirecting to orders page.</p>
                    }
                    <table className="checkout__table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{pdName}</td>
                                <td>{pdQuantity}</td>
                                <td>${pdPrice}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">Total</td>
                                <td>${pdPrice}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="checkout__btn--box">
                    <button onClick={handleCheckOut} className="btn btn__primary">Checkout</button>
                </div>
            </div>
        </section>
    );
};

export default Checkout;