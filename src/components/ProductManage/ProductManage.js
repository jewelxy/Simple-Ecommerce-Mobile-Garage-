import React, { useEffect, useState } from 'react';
import './ProductManage.css';
import ProductTableRow from './ProductTableRow';

const ProductManage = () => {
    const [products, setProducts] = useState([]);

    const loadAllProducts = () => {
        fetch('https://ph-mobile-garage.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    useEffect(() => {
        loadAllProducts();
    }, []);

    return (
        <div className="productManage">
            <h2 className="admin__header">Manage Product</h2>
            <div className="productManage__products">
                <div className="productManage__content">
                    <div className="product__row">
                        <div className="product__col">
                            <h2>Product Name</h2>
                        </div>
                        <div className="product__col">
                            <h2>Price</h2>
                        </div>
                        <div className="product__col">
                            <h2>Color</h2>
                        </div>
                        <div className="product__col">
                            <h2>Action</h2>
                        </div>
                    </div>
                    {
                        products.map(product => <ProductTableRow loadAllProducts={loadAllProducts} product={product} key={product._id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductManage;