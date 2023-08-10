import classNames from 'classnames/bind';
import ProductItem from '~/components/ProductItem';

import styles from './Home.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Home() {
    let checkCart = localStorage.getItem('cart');
    if (!checkCart) {
        let obj = {};
        localStorage.setItem('cart', JSON.stringify(obj));
    }

    return (
        <div className={cx('wrapper')}>
            <video className={cx('video')} autoPlay loop src="https://v.ftcdn.net/03/51/68/46/700_F_351684695_ANkMwyWNwz5qAjIWtb5UOMhytqm9eWve_ST.mp4"></video>
            <div className={cx('video-content')}>
            </div>

            <div className={cx('contain')}>
                <h1 className={cx('title-container')}>Top Trend</h1>
                <div className={cx('container')}>
                    <ProductItem />
                </div>
            </div>
        </div>
    );
}
export default Home;
