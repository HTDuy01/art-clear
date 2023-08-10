import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Logo from '~/assets/images/Logo.png';
import config from '~/config';
import imageLogin from '~/assets/images/imageLogin.png';
import FormSignUp from '~/components/FormSignUp';

import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={Logo} alt="Logo" className={cx('logo')} />
                </Link>
            </header>
            <div className={cx('container')}>
                <div className={cx('content-container')}>
                    <h1 className={cx('title')}>Discover digital assets created by talented artists around the world.</h1>
                    <img width='100%' src={imageLogin} alt="imageLogin" />
                </div>
                <div className={cx('login-container')}>
                    <h1 className={cx('title-login')}>Sign up for Clean Art</h1>
                    <FormSignUp />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
