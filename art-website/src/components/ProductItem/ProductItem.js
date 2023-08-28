import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import config from '~/config';
// import { addCart } from '~/redux/actions';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '~/Context/UserContext';
import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ProductItem({ size = '' }) {
    const [productHome, setProductHome] = useState([]);
    const [artists, setArtists] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productHomeResponse = await axios.get(`http://localhost:8080/api/auth/listImage?size=${size}`);
            setProductHome(productHomeResponse.data.images);

            const artistIds = Object.keys(productHomeResponse.data.images).map((key) => productHomeResponse.data.images[key].artistId);
            const artistPromises = artistIds.map((artistId) => axios.get(`http://localhost:8080/api/auth/artistDetails/${artistId}`));
            const artistResponses = await Promise.all(artistPromises);
            const artistsData = artistResponses.reduce((data, response, index) => {
                data[artistIds[index]] = response.data.name;
                return data;
            }, {});
            setArtists(artistsData);
        } catch (error) {
            console.log(error);
        }
    };

    // Cart
    let objCon = {};
    let soLuong = useContext(Context);
    const handleAddCart = (e) => {
        e.preventDefault();
        let id = e.target.id;
        var checkProduct = true;
        const check = localStorage.getItem('cart');

        if (check) {
            objCon = JSON.parse(check);
            Object.keys(objCon).map((key, index) => {
                if (id == key) {
                    checkProduct = false;
                    objCon[id] = objCon[id] + 1;
                }
            });
        }
        if (checkProduct == true) {
            objCon[id] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(objCon));
        soLuong.setTongSoLuong(Number(soLuong.soLuong) + 1);
    };

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

    function renderProduct() {
        if (Object.keys(artists).length === 0) {
            return <p>Loading...</p>;
        }

        return Object.keys(productHome).map((key, index) => {
            const srcImg = 'http://localhost:8080/api/auth/upload/product/' + productHome[key].id;
            const title = productHome[key].pictureName;
            const price = productHome[key].price;
            const artistId = productHome[key].artistId;
            const artist = artists[artistId];

            return (
                <Link to={'/productDetails/' + productHome[key].id} key={key} className={cx('link-product')}>
                    <div className={cx('product')}>
                        <div className={cx('product-img')}>
                            <img src={srcImg} alt="" />
                        </div>
                        <div className={cx('product-info')}>
                            <div className={cx('product-detail')}>
                                <p key={key} className={cx('text-title')}>
                                    {title}
                                </p>
                                <h5 className={cx('text-body')}>
                                    by <span>{artist}</span>
                                </h5>
                            </div>
                            <span className={cx('text-price')}>{formatPrice(price)}</span>
                        </div>

                        <button id={productHome[key].id} className={cx('cart-button')} onClick={handleAddCart}>
                            Add To Cart
                        </button>
                    </div>
                </Link>
            );
        });
    }

    return renderProduct();
}

export default ProductItem;
