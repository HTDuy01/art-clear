import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { useEffect } from 'react';

import axios from 'axios';
import { useState } from 'react';
import { param } from 'jquery';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Category() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get(' http://localhost:8080/api/auth/ListCategories');
                setData(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        getCategory();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('nav')}>
                {data.map((item, index) => (
                    <p className={cx('category-item')} key={index}>
                        <Link to={`/imgCategory/${item.category_ID}`}> {item.categoryName}</Link>
                    </p>
                ))}
            </nav>
        </div>
    );
}

export default Category;
