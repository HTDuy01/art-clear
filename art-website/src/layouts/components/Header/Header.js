import { useContext, useEffect, useState } from 'react';
import { Context } from '~/Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';

import config from '~/config';
import Search from '~/layouts/components/Search';
import Image from '~/components/Image';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';
import Logo from '~/assets/images/Logo.png';

import styles from './Header.module.scss';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '~/layouts/DropdownMenu/DropdownMenu';
import CryptoJS from 'crypto-js';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    let showSoluong = useContext(Context);
    const checkLevel = JSON.parse(localStorage.getItem('level'));

    let obj = {};
    let srcImg;
    const checkUser = localStorage.getItem('user');
    if (checkUser) {
        obj = JSON.parse(checkUser);
        srcImg = 'https://art-clear-backend.onrender.com/api/auth/detailsUser/avatar/' + obj.data.id;
    }

    const userAdmin = [
        {
            icon: <FontAwesomeIcon icon={faUsers} />,
            title: 'Manager',
            to: '/Admin',
            separate: false,
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Personal',
            to: '/Personal',
        },
        {
            icon: <img src={images.logout} alt="logout" />,
            title: 'Log out',
            to: '/login',
            separate: true,
        },
    ];

    const userCustomer = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Personal',
            to: '/Personal',
        },
        {
            icon: <img src={images.logout} alt="logout" />,
            title: 'Log out',
            to: '/login',
            separate: true,
        },
    ];

    //
    let check = localStorage.getItem('checkLogin');
    function renderLogin() {
        if (check) {
            // Giải mã
            const key = 'mySecretKey123';
            const bytes = CryptoJS.AES.decrypt(checkLevel, key);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

            return (
                <Menu items={decryptedText == 1 ? userAdmin : userCustomer}>
                    <Image
                        src={srcImg}
                        className={cx('user-avatar')}
                        alt="Nguyen Van a"
                        fallback="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/333045181_601317735207298_4556693562166128126_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=uAgQYuClCc4AX93G3Gj&_nc_ht=scontent.fhan2-5.fna&oh=00_AfAmRysF2RFMUyQpAy0qelJnpqQQKxQeMTfOnndRcxaDkg&oe=64175347"
                    />
                </Menu>
            );
        } else {
            return (
                <Link to={config.routes.login}>
                    <Button primary>Log in</Button>
                </Link>
            );
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('bars')}>
                    <DropdownMenu />
                </div>
                <div className={cx('search1')}>
                    <Search />
                </div>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={Logo} alt="Logo" className={cx('logo')} />
                </Link>

                <div className={cx('actions')}>
                    <Tippy delay={200} content="Cart" placement="bottom">
                        <Link to={config.routes.cart}>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faCartShopping} size="xl" />
                                <span className={cx('badge')}>{showSoluong.soLuong ? showSoluong.soLuong : 0}</span>
                            </button>
                        </Link>
                    </Tippy>

                    {renderLogin()}
                </div>
            </div>
        </div>
    );
}

export default Header;
