import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../UserContext';
import { logOutUser } from '../Login/LoginManager';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useContext(UserContext);
    const { name, email, photo } = user;
    const history = useHistory();

    const handleLogout = () => {
        logOutUser()
            .then(res => {
                setUser(res);
                history.push("/");
            });
    };

    return (
        <section className="profile">
            <div className="container">
                <div className="user__card">
                    <img src={photo} alt={name} className="user__img" />
                    <h2 className="user__name">{name}</h2>
                    <h3 className="user__email">{email}</h3>
                    <button className="btn btn__primary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </section>
    );
};

export default Profile;