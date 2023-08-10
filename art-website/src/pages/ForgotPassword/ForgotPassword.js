import { useState } from "react";
import styles from './ForgotPassword.module.scss';
import queryString from 'query-string';
import axios from "axios";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "~/config";
import Loading from "../LoadingPages/Loading";
const cx = classNames.bind(styles);

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isNotAvailable, setNotAvailable] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email) => {
        // Kiểm tra định dạng email bằng regex hoặc phương pháp kiểm tra khác
        // Trả về true nếu hợp lệ, ngược lại trả về false
        // Ví dụ: Kiểm tra định dạng đơn giản với regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setIsLoading(true)
            // Hành động khi email hợp lệ
            setIsValid(true);
            const formData = {
                email: email,
            };

            const encodedData = queryString.stringify(formData);
            axios.post('https://art-clear-backend.onrender.com/api/auth/forgotpassword', encodedData)
                .then(res => {
                    // alert("Mật Khẩu mới của bạn được gởi qua mail")
                    setEmail('')
                    // setIsLoading(false);
                    setIsLoading(true)
                    setTimeout(() => {
                        setIsLoading(false);
                        setIsOpen(true);
                    }, 5000);

                    // console.log(res);
                })
                .catch(err => {
                    setIsLoading(false);

                    setNotAvailable(false);

                    // console.log(err);
                })
        } else {
            // Hành động khi email không hợp lệ
            setIsValid(false);
        }
    };
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()
    const closeForm = () => {
        setIsOpen(false);

    };

    // const handleButton = () => {
    //     // if (isNotAvailable == true) {
    //     //     setIsLoading(true)
    //     // }
    // }

    return (

        <>
            <form className={cx('container_form')} onSubmit={handleSubmit}>
                <fieldset className={cx('account_info')}>
                    <h3>Please enter your email to reset your password</h3>
                    <label>
                        Email

                        <input
                            name="email"
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={handleEmailChange}
                            className={!isValid ? 'invalid' : ''}
                        />
                        {!isValid && <p className={cx('error')}>Email invalidate</p>}
                        {!isNotAvailable && <p className={cx('error')}>Your email is currently not registered</p>}
                    </label>
                </fieldset>
                <fieldset className={cx('account_action')}>
                    <input className={cx('btn')} type="submit" name="submit" value="Enter" />

                </fieldset>
            </form>
            {/* isLoading */}
            {isLoading &&
                <div className={cx('overlay')}>
                    <div className={cx('popup')}>

                        <div className={cx('form_container')}>
                            <Loading />

                            <h2>Please wait</h2>
                        </div>
                    </div>
                </div>
            }
            {/* isOpen */}
            {isOpen &&
                <div className={cx('overlay')}>
                    <div className={cx('popup')}>
                        <div className={cx('form_container')}>
                            <div className={cx('form_group')}>
                                <h2>Do you want to go to the login page?</h2>
                            </div>
                            <div className={cx('form_button')}>
                                <button type="button" onClick={closeForm} className={cx('btn')}>No</button>
                                <button type="button" className={cx('btn')}><Link to={config.routes.login} >Next</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </>

    );
}
export default ForgotPassword;