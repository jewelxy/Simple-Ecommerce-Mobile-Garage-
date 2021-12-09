import React, { useState } from 'react';
import './ProductAdd.css';
import { useForm } from "react-hook-form";
import Spinner from '../../img/loader.svg';

const ProductAdd = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [pdImage, setPdImage] = useState(' ');
    const [productAdded, setProductAdded] = useState(false);

    const handleImageUpload = (e) => {
        setPdImage('');
        const ImageData = new FormData();
        ImageData.set('key', '4c190cb78bdf709d8f0feb43f8283d35');
        ImageData.set('image', e.target.files[0]);

        fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: ImageData
        })
            .then(res => res.json())
            .then(data => setPdImage(data.data.display_url))
            .catch(err => console.log(err.message))
    }

    const handleAddProduct = (data) => {
        if (!pdImage) return;
        const product = data;
        product.pdPhoto = pdImage;

        fetch('https://ph-mobile-garage.herokuapp.com/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    reset();
                    setProductAdded(data);

                    setTimeout(() => {
                        setProductAdded(false);
                    }, 2000)
                }
            })
    }

    return (
        <div className="productAdd">
            <h2 className="admin__header">Add Product</h2>
            <form className="productAdd__form" onSubmit={handleSubmit(handleAddProduct)}>
                <p className="warning">Please upload a transparent image (PNG) without extra white space for better view.</p>
                {
                    productAdded && <p className="success">Product succesfully added to the database.</p>
                }
                <div className="productAdd__form--content">
                    <div className="input__group">
                        <label htmlFor="pdName">Product Name</label>
                        <input
                            name="pdName"
                            id="pdName"
                            type="text"
                            ref={register({ required: "* Product name is required" })}
                            placeholder="Enter Name"
                        />
                        {errors.pdName && <p className="error">{errors.pdName.message}</p>}
                    </div>
                    <div className="input__group">
                        <label htmlFor="pdPrice">Add Price</label>
                        <input
                            name="pdPrice"
                            id="pdPrice"
                            type="text"
                            ref={register({ required: "* Price is required" })}
                            placeholder="Enter Price"
                        />
                        {errors.pdPrice && <p className="error">{errors.pdPrice.message}</p>}
                    </div>
                    <div className="input__group">
                        <label htmlFor="pdColor">Add Color</label>
                        <input
                            name="pdColor"
                            id="pdColor"
                            type="text"
                            ref={register({ required: "* Color is required" })}
                            placeholder="Enter Color"
                        />
                        {errors.pdColor && <p className="error">{errors.pdColor.message}</p>}
                    </div>
                    <div className="input__group">
                        <label htmlFor="pdPhoto">Add Photo</label>
                        <input
                            name="pdPhoto"
                            id="pdPhoto"
                            type="file"
                            ref={register({ required: "* Photo is required" })}
                            onChange={handleImageUpload}
                        />
                        {errors.pdPhoto && <p className="error">{errors.pdPhoto.message}</p>}
                    </div>
                </div>
                <div className="btn--box">
                    {!pdImage && <img className="btn__spinner" src={Spinner} alt="Uploading" />} <input className={`btn btn__primary ${!pdImage && 'disabled'}`} type="submit" value="Save" />
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;