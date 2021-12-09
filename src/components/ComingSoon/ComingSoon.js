import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = (props) => {
    const { page } = props;
    return (
        <div className="container">
            <div className="comingSoon">
                <h2 className="comingSoon__title">{page}</h2>
                <h3 className="comingSoon__subtitle">Coming Soon!</h3>
                <Link to="/" className="btn btn__primary">Back to homepage</Link>
            </div>
        </div>
    );
};

export default ComingSoon;