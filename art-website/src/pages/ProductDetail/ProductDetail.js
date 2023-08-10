import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './ProductDetail.module.scss';

import axios from 'axios';
import Comment from '../Comment/Comment';
import ListComment from '../Comment/ListComment';
import Rate from './Rate';
import { Context } from '~/Context/UserContext';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function ProductDetail(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);
    const [listComment, setListComment] = useState([]);
    const [idREPLY, setidREPLY] = useState('');
    const [runAgain, setRunAgain] = useState('stop');
    const srcImg = 'https://art-clear-backend.onrender.com/api/auth/upload/product/' + params.id;
    const [dataCategory, setDataCategory] = useState([]);

    function getRunAgain(data) {
        setRunAgain(data);
    }

    function getId(id) {
        setidREPLY(id);
    }

    function getComment(data) {
        let concatArray = listComment.concat(data);
        setListComment(concatArray);
    }

    function getCommentReply(dataReply) {
        let concatArray = listComment.concat(dataReply);
        setListComment(concatArray);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`https://art-clear-backend.onrender.com/api/auth/detailsImage/${params.id}`);
                setData(response.data);

                const listComment = await axios.get(`https://art-clear-backend.onrender.com/api/auth/comment/${params.id}`);
                setListComment(listComment.data);

                const listCategory = await axios.get('https://art-clear-backend.onrender.com/api/auth/ListCategories');
                setDataCategory(listCategory.data);

                setRunAgain('stop');
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [runAgain, params.id]);

    // Cart
    let objCon = {};
    let soLuong = useContext(Context);
    const handleAddCart = (e) => {
        e.preventDefault();
        let id = params.id;
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('image')}>
                    <img src={srcImg} alt="art" />
                </div>
                <div className={cx('pay')}>
                    <h1 className={cx('title')}>{data.pictureName}</h1>
                    <p className={cx('total-price')}>{formatPrice(data.price)} </p>
                    <Rate />
                    <p className={cx('description')}>{data.description}</p>

                    <div className={cx('action')}>
                        <Button onClick={handleAddCart} primary className={cx('btn-pay')}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className={cx('contain')}>
                <h4 className={cx('title')}>You May Also Like</h4>
                <div className={cx('container')}>
                    <ProductItem size={8} />
                </div>
            </div>

            <div className={cx('comment')}>
                <h1 className={cx('title')}>Comment</h1>
                <Comment getRunAgain={getRunAgain} getComment={getComment} idREPLY={idREPLY} getId={getId} />
                <ListComment getRunAgain={getRunAgain} listComment={listComment} getId={getId} getCommentReply={getCommentReply} />
            </div>

            <div className={cx('more-category')}>
                <h4 className={cx('title')}>Keep Exploring</h4>
                <div className={cx('more-category_container')}>
                    {dataCategory.map((item, index) => (
                        <Button primary small key={index} className={cx('category-item')}>
                            <Link to={`/imgCategory/${item.category_ID}`} className={cx('category-item_link')}>
                                {item.categoryName}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;
