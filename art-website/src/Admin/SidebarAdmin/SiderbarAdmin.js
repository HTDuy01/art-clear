import React from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';


import './SidebarAdmin.scss';

function SidebarAdmin() {
    return (
        
            <div className="sidebar">
                <ul className=" menu">
                    <Link to={config.routes.host} >
                        <li className="menu-item">Admin Page</li>
                    </Link>
                    <Link to={config.routes.Artists} >
                        <li className="menu-item">Artists</li>
                    </Link>
                    <Link to={config.routes.Categories} >
                        <li className="menu-item">Categories</li>
                    </Link>
                    <Link to={config.routes.Product} >
                        <li className="menu-item">Products</li>
                    </Link>
                    <Link to={config.routes.Invoices} >
                        <li className="menu-item">Invoices</li>
                    </Link>
                    <li className="menu-item">Contact</li>
                </ul>
            </div>
        
    );
}
export default SidebarAdmin;

