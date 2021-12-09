import React from 'react';
import Edit from '../../img/icon/edit2.png';
import Delete from '../../img/icon/delete.png';
import { Link } from 'react-router-dom';

const ProductTableRow = (props) => {
    const { loadAllProducts, product } = props;
    const { _id, pdName, pdPrice, pdColor } = product;

    const handleDeleteProduct = () => {
        fetch(`https://ph-mobile-garage.herokuapp.com/deleteProduct/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    loadAllProducts();
                }
            })
    }

    return (
        <div className="product__row">
            <div className="product__col">
                <h3>{pdName}</h3>
            </div>
            <div className="product__col">
                <h3>${pdPrice}</h3>
            </div>
            <div className="product__col">
                <h3>{pdColor}</h3>
            </div>
            <div className="product__col">
                <Link to="/admin/edit" className="pdAction__btn">
                    <img className="object-cover" src={Edit} alt="Edit Product" />
                </Link>
                <button className="pdAction__btn" onClick={handleDeleteProduct}>
                    <img className="object-cover" src={Delete} alt="Delete Product" />
                </button>
            </div>
        </div>
    );
};

export default ProductTableRow;