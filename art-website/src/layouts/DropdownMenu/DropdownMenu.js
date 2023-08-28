import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import { Link } from 'react-router-dom';
import Menu from '~/components/Popper/Menu/Menu';
import Image from '~/components/Image/Image';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/images';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Search from '../components/Search/Search';
import Tippy from '@tippyjs/react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    let check = localStorage.getItem('checkLogin');
    const checkLevel = JSON.parse(localStorage.getItem('level'));

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(!isOpen);
    };
    let obj = {};
    let srcImg;
    const checkUser = localStorage.getItem('user');
    if (checkUser) {
        obj = JSON.parse(checkUser);
        srcImg = 'http://localhost:8080/api/auth/detailsUser/avatar/' + obj.data.id;
    }

    const userAdmin = [
        {
            icon: <FontAwesomeIcon icon={faUsers} />,
            title: 'Manager',
            to: '/Admin',
            separate: false,
            onClick: closeMenu,
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

    // Giải mã
    const key = 'mySecretKey123';

    function renderLogin() {
        if (check) {
            const bytes = CryptoJS.AES.decrypt(checkLevel, key);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            return (
                <Menu items={decryptedText == 1 ? userAdmin : userCustomer}>
                    <p>
                        <Image
                            src={srcImg}
                            className={cx('user-avatar')}
                            // alt="Nguyen Van a"
                            fallback="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/333045181_601317735207298_4556693562166128126_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=uAgQYuClCc4AX93G3Gj&_nc_ht=scontent.fhan2-5.fna&oh=00_AfAmRysF2RFMUyQpAy0qelJnpqQQKxQeMTfOnndRcxaDkg&oe=64175347"
                        />
                        Account{' '}
                    </p>
                </Menu>
            );
        } else {
            return (
                <Link className="btn_login" to={config.routes.login}>
                    <button className={cx('action-btn')} style={{ margin: '0 25px' }}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" />
                    </button>
                    Log in
                </Link>
            );
        }
    }

    return (
        <div className={cx('dropdown')}>
            <button className={cx('dropdown-toggle')} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            {isOpen && (
                <ul className={cx('dropdown-menu')}>
                    <li className={cx('container-search')}>
                        <Search />
                    </li>
                    <li className={cx('container-renderLogin')}>{renderLogin()}</li>
                    <li onClick={closeMenu} className={cx('container-cart')}>
                        <Tippy delay={200} content="Cart" placement="bottom">
                            <Link to={config.routes.cart}>
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCartShopping} size="xl" />
                                </button>
                                Cart
                            </Link>
                        </Tippy>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;
