import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import './Admin.css';
import Grid from '../../img/icon/grid.png';
import Plus from '../../img/icon/plus.png';
import Edit from '../../img/icon/edit.png';
import ProductAdd from '../ProductAdd/ProductAdd';
import ProductManage from '../ProductManage/ProductManage';
import ProductEdit from '../ProductEdit/ProductEdit';

const Admin = () => {
    const match = useRouteMatch();
    const activePath = useHistory().location.pathname.split('/')[2] || 'manage';
    const [active, setActive] = useState(activePath);

    useEffect(() => {
        setActive(activePath);
    }, [activePath]);

    return (
        <section className="admin">
            <div className="sidebar">
                <Link className="sidebar__logo" to="/">Mobile Garage</Link>
                <nav className="sidebar__nav">
                    <Link
                        className={`sidebar__link ${active === 'manage' ? 'active' : ''}`}
                        to={`${match.path}/manage`}>
                        <span><img src={Grid} alt="Grid" /> Manage Product</span>
                    </Link>

                    <Link
                        className={`sidebar__link ${active === 'add' ? 'active' : ''}`}
                        to={`${match.path}/add`}>
                        <span><img src={Plus} alt="Grid" /> Add Product</span>
                    </Link>

                    <Link
                        className={`sidebar__link ${active === 'edit' ? 'active' : ''}`}
                        to={`${match.path}/edit`}>
                        <span><img src={Edit} alt="Grid" /> Edit Product</span>
                    </Link>
                </nav>
            </div>
            <div className="admin__content">
                <Switch>
                    <Route exact path={`${match.path}/`}>
                        <ProductManage />
                    </Route>
                    <Route path={`${match.path}/manage`}>
                        <ProductManage />
                    </Route>
                    <Route path={`${match.path}/add`}>
                        <ProductAdd />
                    </Route>
                    <Route path={`${match.path}/edit`}>
                        <ProductEdit />
                    </Route>
                </Switch>
            </div>
        </section>
    );
};

export default Admin;