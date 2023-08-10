import classNames from 'classnames/bind';

import styles from './About.module.scss';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('about-page__hero')}>
                <div className={cx('sp-container')}>
                    <div className={cx('about-page__hero-text')}>
                        <h1 className={cx('about-heading')}>Welcome to the world’s marketplace for design</h1>
                        <p className={cx('about-subhead')}>
                            Discover more than 4 million quality resources created by artists in over 190 countries around the world. Join forces with talented designers to make
                            your projects stand out.
                        </p>
                    </div>
                    <div className={cx('about-page__hero-img')}>
                        <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/about-hero@2x.png" alt="pic" />
                    </div>
                </div>
            </div>

            <div className={cx('about-page_background')}>
                <div className={cx('sp-container')}>
                    <div className={cx('about-page_background-text')}>
                        <h1 className={cx('background_text-heading')}>A world of design at your fingertips</h1>
                        <p className={cx('background_text-subhead')}>
                            Find the perfect template, pair it with a striking image, and overlay beautiful type. Creative Market is home to millions of design resources that work
                            great together. Explore Handpicked Products
                        </p>
                    </div>
                    <div className={cx('about-page__hero-img')}>
                        <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/loop1@2x.png" alt="pic" />
                    </div>
                </div>

                <div className={cx('about-page__handpicked-products')}>
                    <div className={cx('about-page__handpicked-left')}>
                        <span className={cx('about-page__handpicked-image')}>
                            <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/handpicked_product1.webp" alt="123" />
                        </span>
                    </div>
                    <div className={cx('about-page__handpicked-right')}>
                        <span className={cx('about-page__handpicked-image')}>
                            <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/handpicked_product2.webp" alt="123" />
                        </span>
                        <span className={cx('about-page__handpicked-image')}>
                            <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/handpicked_product3.webp" alt="123" />
                        </span>
                    </div>
                </div>
            </div>

            <div className={cx('about-page_video')}>
                <div className={cx('sp-container')}>
                    <div className={cx('about-page_video-text')}>
                        <h1 className={cx('about-heading')}>Empowering creators to make a living doing what they love</h1>
                        <p className={cx('about-subhead')}>
                            Creative Market empowers creators around the world to make their ideas a reality. Everything we do is to help them turn passion into opportunity, no
                            matter their race, gender, or location. If you’re ready to showcase and market your talent, join us below!
                        </p>
                    </div>
                    <div>
                        <video width={651} autoPlay controls loop src="https://v.ftcdn.net/03/51/68/46/700_F_351684695_ANkMwyWNwz5qAjIWtb5UOMhytqm9eWve_ST.mp4"></video>
                    </div>
                </div>
            </div>

            <div className={cx('about-page__loop')}>
                <span>
                    <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/loop2.webp" alt="123" />
                </span>
                <span>
                    <img src="https://d3ui957tjb5bqd.cloudfront.net/images/1/about/loop2.webp" alt="123" />
                </span>
            </div>
        </div>
    );
}

export default About;
