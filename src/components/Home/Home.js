import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import ProductCard from '../ProductCard/ProductCard';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        fetch('https://ph-mobile-garage.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setShowLoader(false);
            })
    }, []);

    return (
        <section className="home">
            {
                showLoader && <Preloader />
            }
            <div className="container">
                <div className="products">
                    {
                        products.map(product => <ProductCard product={product} key={product._id} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;