import { useContext, useEffect, useState } from 'react';
import { Context } from '~/Context/UserContext';
import axios from 'axios';
import styles from './CartItem.module.scss';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

import styles1 from './Cart.module.scss';
import { useNavigate } from 'react-router-dom';
import Pay from './Pay';

const cx1 = classNames.bind(styles1);
const cx = classNames.bind(styles);

function Cart() {
    const [cart, setCart] = useState('');
    const navigate = useNavigate();
    let valueTotal = useContext(Context);
    const [runAgain, setRunAgain] = useState('stop');

    useEffect(() => {
        let item = JSON.parse(localStorage.getItem('cart'));
        if (item) {
            axios.post(' http://localhost:8080/api/auth/productCart', item).then((res) => {
                setCart(res.data.data);
                setRunAgain('stop');
            });
        }
    }, [runAgain]);
    function getRunAgain(data) {
        setRunAgain(data);
    }

    let obj = JSON.parse(localStorage.getItem('cart'));

    // Tăng
    function increaseCart(e) {
        let id = e.target.id;
        Object.keys(obj).map((key, index) => {
            if (id == key) {
                obj[id] = obj[id] + 1;
            }
        });

        localStorage.setItem('cart', JSON.stringify(obj));
        axios.post('http://localhost:8080/api/auth/productCart', obj).then((res) => {
            if (res.data.errors) {
                console.log(res.data.errors);
            } else {
                setCart(res.data.data);
            }
        });
    }

    // Giảm
    function reduceCart(e) {
        let id = e.target.id;
        Object.keys(obj).map((key, index) => {
            if (id === key) {
                obj[id] = obj[id] - 1;
            }
            // nếu xoá quantity đến 0 thì sẽ xoá trong localStorage
            if (obj[id] == 0) {
                delete obj[id];
            }
        });

        localStorage.setItem('cart', JSON.stringify(obj));
        axios.post('http://localhost:8080/api/auth/productCart', obj).then((res) => {
            if (res.data.errors) {
                console.log(res.data.errors);
            } else {
                setCart(res.data.data);
            }
        });
    }

    // Xóa
    function deteleProduct(e) {
        let id = e.target.id;

        delete obj[id];
        localStorage.setItem('cart', JSON.stringify(obj));
        axios.post('http://localhost:8080/api/auth/productCart', obj).then((res) => {
            if (res.data.errors) {
                console.log(res.data.errors);
            } else {
                setCart(res.data.data);
            }
        });
    }

    var S = 0;
    var totalQuantity = 0;
    let Cart = [];

    function formatPrice(price) {
        if (price >= 1_000_000_000) {
            const formattedPrice = (price / 1_000_000_000).toFixed(2);
            return `$${formattedPrice}B`;
        } else if (price >= 1_000_000) {
            const formattedPrice = (price / 1_000_000).toFixed(2);
            return `$${formattedPrice}M`;
        } else {
            return `$${price}`;
        }
    }

    function renderProductCart() {
        if (Object.keys(obj).length === 0) {
            valueTotal.setTongSoLuong(totalQuantity);
        }

        return Object.keys(cart).map((key, value) => {
            const srcImg = 'http://localhost:8080/api/auth/upload/product/' + cart[key].id;
            const name = cart[key].picture_name;
            const price = cart[key].price;
            const quantity = cart[key].quantity;
            const total = Number(price) * quantity;
            let obj = {
                srcImg: srcImg,
                name: name,
                price: price,
                quantity: quantity,
            };
            Cart.push(obj);
            S = S + Number(total);
            totalQuantity = totalQuantity + quantity;
            valueTotal.setTongSoLuong(totalQuantity);

            return (
                <div key={key} className={cx('wrapper')}>
                    <Image className={cx('img')} src={srcImg} />
                    <div className={cx('content')}>
                        <div className={cx('name')}>
                            <span className={cx('name-product')}>{name}</span>
                        </div>
                        <div className={cx('action')}>
                            <div className={cx('detail')}>
                                <span className={cx('detail-label')}>Price</span>
                                <p className={cx('detail-price')}>{formatPrice(price)}</p>
                            </div>
                            <div>
                                <button className={cx('btn-minus')} id={cart[key].id} disabled={quantity === 1} onClick={reduceCart}>
                                    -
                                </button>
                                <span className={cx('amount')}>{quantity} seat</span>
                                <button className={cx('btn-add')} id={cart[key].id} onClick={increaseCart}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('tally')}>
                        <span className={cx('tally-price')}>{formatPrice(total)}</span>
                        <button className={cx('btn-remove')} id={cart[key].id} onClick={deteleProduct}>
                            Remove
                        </button>
                    </div>
                </div>
            );
        });
    }

    // HandlePay

    return (
        <div className={cx1('wrapper')}>
            <h1 className={cx1('title')}>Your Cart</h1>
            <div className={cx1('container')}>
                <div className={cx1('listCart')}>{renderProductCart()}</div>
                <div className={cx1('pay')}>
                    <p className={cx1('pay-title')}>Checkout without one and pay full price</p>
                    <div className={cx1('cart-subtotal')}>
                        <p className={cx1('cart-subtotal__title')}>Cart Subtotal</p>
                        <p className={cx1('total-price')}>{formatPrice(S)}</p>
                    </div>
                    <Button primary className={cx1('btn-pay')}>
                        <Pay total={S} Cart={Cart} getRunAgain={getRunAgain} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
