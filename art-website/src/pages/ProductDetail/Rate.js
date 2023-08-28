import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

function Rate(props) {
    const check = localStorage.getItem('checkLogin');
    const checkUser = localStorage.getItem('user');
    const params = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);

    let obj = {};
    if (checkUser) {
        obj = JSON.parse(checkUser);
    }
    // hiển thị tổng đánh giá
    const [totalRating, setTotalRating] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/auth/image/rate/' + params.id)
            .then((res) => {
                setTotalRating(res.data);
            })
            .catch((err) => console.log(err));
    }, [params.id]);
    var a = 0;
    var b = 0;
    totalRating.map((key, index) => {
        a = Number(key.rate) + a;
        b = a / totalRating.length;
    });

    // Đánh giá
    function changeRating(newRating, name) {
        setRating(newRating);
        if (!check) {
            let answer = window.confirm('Please log in !');
            if (answer) {
                navigate('/login');
            } else {
            }
        } else {
            if (Object.keys(obj).length > 0) {
                // id user
                const id = obj.data.id;

                const data = {
                    userId: id,
                    imageId: params.id,
                    rate: newRating,
                };
                axios
                    .post('http://localhost:8080/api/auth/image/rate', data)
                    .then((res) => {})
                    .catch((err) => console.log(err));
            }
        }
    }

    return (
        <div className={cx('rating-area')}>
            <ul className={cx('ratings')}>
                <li>
                    <StarRatings
                        rating={!changeRating ? rating : b}
                        starRatedColor="#FFDF00"
                        starHoverColor="#FF69DC"
                        changeRating={changeRating}
                        numberOfStars={6}
                        name="rating"
                        starDimension="20px"
                        starSpacing="2px"
                    />
                </li>
            </ul>
        </div>
    );
}
export default Rate;
