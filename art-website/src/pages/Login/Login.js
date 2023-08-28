import { useState } from 'react';
import classNames from 'classnames/bind';

import { Link, useNavigate } from 'react-router-dom';
import Logo from '~/assets/images/Logo.png';
import config from '~/config';
import imageLogin from '~/assets/images/imageLogin.png';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from './Login.module.scss';
import axios from 'axios';
import Loading from '../LoadingPages/Loading';
import CryptoJS from 'crypto-js';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const initialValues = { username: '', email: '', password: '', fullName: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isvalidate, setIsvalidate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        //  validation
        setFormValues({ ...formValues, [name]: value });

        // Login
        setLogin((state) => ({ ...state, [name]: value }));
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = 'Username is required!';
        }

        if (!values.fullName) {
            errors.fullName = 'fullName is required!';
        }
        if (!values.email) {
            errors.email = 'email is required!';
        } else if (!regex.test(values.email)) {
            errors.email = 'This is a valid email format!';
        }

        if (!values.password) {
            errors.password = 'Password is required!';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        let flag = true;

        // handle validation
        e.preventDefault();
        setIsSubmit(true);

        if (flag) {
            let formData = new FormData();
            formData.append('usernameOrEmail', login.username);
            formData.append('password', login.password);
            axios
                .post('http://localhost:8080/api/auth/signin', formData)
                .then((res) => {
                    let level = res.data.roles;

                    Object.keys(level).map((key, index) => {
                        level = level[0].role_ID;
                    });
                    const plaintext = String(level);
                    const key = 'mySecretKey123';

                    // Mã hóa
                    const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();

                    localStorage.setItem('level', JSON.stringify(ciphertext));
                    localStorage.setItem('user', JSON.stringify(res));

                    const checkLogin = true;
                    localStorage.setItem('checkLogin', JSON.stringify(checkLogin));
                    setIsLoading(true);
                    const timer = setTimeout(() => {
                        setIsLoading(false);
                        navigate('/');
                    }, 2000);
                    return () => clearTimeout(timer);
                })
                .catch((err) => {
                    if (login.username != '' && login.password != '' && login.password.length > 6) {
                        setIsvalidate(true);
                    }
                    setFormErrors(validate(formValues));
                });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={Logo} alt="Logo" className={cx('logo')} />
                </Link>
            </header>
            <div className={cx('container')}>
                <div className={cx('content-container')}>
                    <h1 className={cx('title')}>Welcome back to the world’s marketplace for design</h1>
                    <img width="100%" src={imageLogin} alt="imageLogin" />
                </div>

                <div className={cx('login-container')}>
                    <h1 className={cx('title-login')}>Log in to Clean Art</h1>
                    <form className={cx('login')} onSubmit={handleSubmit}>
                        <div className={cx('text-form')}>
                            <label className={cx('label-login')} htmlFor="username">
                                Username*
                            </label>
                            <input className={cx('input-login')} name="username" id="username" type="text" onChange={handleChange} />
                            <p className={cx('error')}>{formErrors.username}</p>
                        </div>
                        <div className={cx('text-form')}>
                            <label className={cx('label-login')} htmlFor="password">
                                Password
                            </label>
                            <input className={cx('input-login')} name="password" id="password" type="password" onChange={handleChange} />
                            <p className={cx('error')}>{formErrors.password}</p>
                        </div>
                        {isvalidate && <p className={cx('error')}>Wrong account or password</p>}
                        <Button className={cx('btn-login')} primary>
                            Login
                        </Button>
                        <div className={cx('text-form')}>
                            <label className={cx('label-login')} htmlFor="password">
                                <Link to={config.routes.ForgotPassword}>Forgot Password?</Link>
                            </label>
                        </div>
                    </form>
                    <div className={cx('ruled')}>
                        <span>OR</span>
                    </div>

                    <div className={cx('sign-up')}>
                        <span>New around here?</span>
                        <Link to={config.routes.signUp} className={cx('link-sign-up')}>
                            Sign Up!
                        </Link>
                    </div>
                </div>
            </div>
            {/* isLoading */}
            {isLoading && (
                <div className={cx('overlay')}>
                    <div className={cx('popup')}>
                        <div className={cx('form_container')}>
                            <Loading />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
