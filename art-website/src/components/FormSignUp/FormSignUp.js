import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import config from '~/config';
import Button from '~/components/Button';

import styles from './FormSignUp.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function FormSignUp() {
    const navigate = useNavigate();
    const initialValues = { username: '', email: '', password: '', fullname: '' ,file:''};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [signUp, setSignUp] = useState({
        username: '',
        password: '',
        fullname: '',
        phone: '',
        email: '',
    });

    const arrTypeImage = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
    const [file, setFile] = useState('');
    function handleFile(e) {
        setFile(e.target.files[0]);
    }

    const handleChange = (e) => {
        //  validation
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        // Login

        setSignUp((state) => ({ ...state, [name]: value }));
    };
    console.log(signUp);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = 'Username is required!';
        }

        if (!values.fullname) {
            errors.fullname = 'fullName is required!';
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
        if (!values.phone) {
            errors.phone = 'Phone is required!';
        }
        if (file != '') {
            const nameFile = file.name;
            const typeFile = file.type;
            const TypeImg = typeFile.split('/').pop();

            if (!arrTypeImage.includes(TypeImg)) {
                // set lỗi "file bạn chọn không phải ảnh" + typeFile;
                errors.file = nameFile +' không phải file ảnh' ;
            }
        }

        return errors;
    };

    const handleSubmit = (e) => {
        let flag = true;
        e.preventDefault();
        setIsSubmit(true);

        

        if (flag) {
            // const data = {
            //     username: signUp.username,
            //     password: signUp.password,
            //     fullname: signUp.fullname,
            //     phone: signUp.phone,
            //     email: signUp.email,
            //     file:file
            // };
            let formData = new FormData();
            formData.append('fullname', signUp.fullname);
            formData.append('username', signUp.username);
            formData.append('email', signUp.email);
            formData.append('phone', signUp.phone);
            formData.append('password', signUp.password);
            if (file != '') {
                formData.append('file', file);
            }

            console.log(formData);
            axios
                .post(' https://art-clear-backend.onrender.com/api/auth/signup', formData)
                .then((res) => {
                    console.log(res.data);
                    alert('thành công');

                    navigate('/login');
                })
                .catch((err) => {
                    console.log(err);
                    alert('thất bại');
                    setFormErrors(validate(formValues));
                });
        } else {
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('login')} onSubmit={handleSubmit}>
                <div className={cx('text-form')}>
                    <label className={cx('label-login')} htmlFor="username">
                        Username*
                    </label>
                    <input className={cx('input-login')} id="username" name="username" type="text" onChange={handleChange} />
                    <p className={cx('error')}>{formErrors.username}</p>
                </div>
                <div className={cx('text-form')}>
                    <label className={cx('label-login')} htmlFor="fullName">
                        Full Name*
                    </label>
                    <input className={cx('input-login')} id="fullName" name="fullname" type="text" onChange={handleChange} />
                    <p className={cx('error')}>{formErrors.fullname}</p>
                </div>

                <div className={cx('text-form')}>
                    <label className={cx('label-login')} htmlFor="email">
                        Email*
                    </label>
                    <input className={cx('input-login')} required id="email" name="email" type="email" onChange={handleChange} />
                    <p className={cx('error')}>{formErrors.email}</p>
                </div>
                <div className={cx('text-form')}>
                    <label className={cx('label-login')} htmlFor="password">
                        Password*
                    </label>
                    <input className={cx('input-login')} id="password" name="password" type="password" onChange={handleChange} />
                    <p className={cx('error')}>{formErrors.password}</p>
                </div>
                <div className={cx('text-form')}>
                    <label className={cx('label-login')} htmlFor="phone">
                        Phone*
                    </label>
                    <input className={cx('input-login')} id="phone" name="phone" type="text" onChange={handleChange} />
                    <p className={cx('error')}>{formErrors.phone}</p>
                </div>
                <div className={cx('text-form')}>
                    <label className={cx('label-login')} htmlFor="username">
                        Avata
                    </label>
                    <input className={cx('input-file')} id="Image" type="file" name="file" multiple onChange={handleFile} />
                    <p className={cx('error')}>{formErrors.file}</p>
                </div>

                <Button className={cx('btn-login')} primary>
                    Sign Up
                </Button>
            </form>
            <div className={cx('ruled')}>
                <span>OR</span>
            </div>

            <div className={cx('sign-up')}>
                <span>New around here?</span>
                <Link to={config.routes.login} className={cx('link-sign-up')}>
                    Login !
                </Link>
            </div>
        </div>
    );
}

export default FormSignUp;
