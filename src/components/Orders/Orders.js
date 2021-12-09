import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import OrderCard from '../OrderCard/OrderCard';
import Preloader from '../Preloader/Preloader';
import './Orders.css';

const Orders = () => {
    const [user] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    const loadOrders = () => {
        fetch(`https://ph-mobile-garage.herokuapp.com/orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setShowLoader(false);
            });
    };

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line
    }, []);

    return (
        <section className="order">
            {
                showLoader && <Preloader />
            }
            <div className="container">
                <h2 className="order__title">Your Orders</h2>
                <div className="order__content">
                    {
                        !orders.length && <h2 className="order__message">You didn't ordered any product. <br /> <Link className="btn btn__primary" to="/">Order now</Link> </h2>
                    }
                    {
                        orders.map(order => <OrderCard order={order} loadOrders={loadOrders} key={order._id} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default Orders;