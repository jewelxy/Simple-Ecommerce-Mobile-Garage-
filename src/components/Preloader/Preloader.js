import React from 'react';
import './Preloader.css';
import Loader from '../../img/loader.svg';

const Preloader = () => {
    return (
        <div className="preloader">
            <img src={Loader} alt="" />
        </div>
    );
};

export default Preloader;