import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '~/Context/UserContext';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './Pay.module.scss';
import Loading from '../LoadingPages/Loading';

const cx = classNames.bind(styles);

function Pay(props) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOke, setIsOke] = useState(false);

    let valueTotal = useContext(Context);
    let items = JSON.parse(localStorage.getItem('cart'));
    let user = JSON.parse(localStorage.getItem('user'));

    const openForm = () => {
        setIsOpen(true);
    };

    const closeForm = () => {
        setIsOpen(false);
    };
    const checkLogin = localStorage.getItem('checkLogin');
    function handlePay() {
        if (checkLogin) {
        const data = {
            buyerName: user.data.fullname,
            items: items,
            totalAmount: props.total,
        };

        axios.post('https://art-clear-backend.onrender.com/api/auth/invoices', data).then((res) => {
            setIsOpen(false);
            localStorage.setItem('cart', JSON.stringify({}));
            valueTotal.setTongSoLuong(0);
            setIsLoading(true)
            let obj = JSON.parse(localStorage.getItem('cart'));
            
            const showLoading = setTimeout(() => {
                setIsLoading(false);
                setIsOke(true);
              }, 5000);

            
            const hideLoading = setTimeout(() => {
                setIsOke(false);
                if (Object.keys(obj).length === 0) {
                    valueTotal.setTongSoLuong(0);
                }
                navigate('/')

            }, 7000);
          
              return () => {
                clearTimeout(showLoading);
                clearTimeout(hideLoading)
              };
            
        });
        }else{
            let answer = window.confirm("Please log in !");
            if (answer) {
                navigate('/login')
            }
            else {
                
            }
        }
    }
    return (
        <div>
            <button className={cx('btn-pay')} onClick={openForm}>
                Pay
            </button>

            {isOpen && (
                <div className={cx('modal-manager')}>
                    <div className={cx('modal-backdrop')}>
                        <div className={cx('buy-now')}>
                            <h1 className={cx('title')}>By Now</h1>
                            <div className={cx('wrapper')}>
                                {props.Cart.map((key, index) => {
                                    return (
                                        <div key={index} className={cx('product')}>
                                            <img className={cx('product-img')} src={key.srcImg} alt="img" />
                                            <div className={cx('product-info')}>
                                                <span className={cx('product-name')}>{key.name}</span>
                                                <span className={cx('product-price')}>{key.price} $</span>
                                            </div>
                                            <div className={cx('product-info')}>
                                                <span className={cx('product-quantity')}>Amount</span>
                                                <span className={cx('product-quantity')}>{key.quantity}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={cx('product-pay')}>
                                <span>Total</span>
                                <span className={cx('total-price')}>${props.total} USD</span>
                            </div>
                            <div className={cx('action')}>
                                <Button primary onClick={handlePay}>
                                    Order
                                </Button>
                                <Button primary onClick={closeForm}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        {isLoading &&
                <div className={cx('overlay')}>
                    <div className={cx('popup')}>

                        <div className={cx('form_container')}>
                            <Loading />

                            <h2>Are Ordering</h2>
                        </div>
                    </div>
                </div>
        }

        {isOke &&
               <div className={cx('modal-manager')}>
                    <div className={cx('modal-backdrop')}>
                            <h2>Success {'\u2714'}</h2>
                    </div>
                </div>
            }
        </div>
    );
}
export default Pay;
