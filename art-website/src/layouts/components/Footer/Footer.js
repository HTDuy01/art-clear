import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Logo from '~/assets/images/Logo.png';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <footer className={cx('footer')}>
                <div className={cx('footer-content')}>
                    <div className={cx('footer-section')}>
                        <Link to={config.routes.home} className={cx('logo-link')}>
                            <img src={Logo} alt="Logo" className={cx('logo')} />
                        </Link>
                        <p>Accelerate your projects with millions of ready-to-use products.</p>
                    </div>
                    <div className={cx('footer-section')}>
                        <h3>Page</h3>
                        <div className={cx('about-list')}>
                            <Link className={cx('about-item')} to={config.routes.home}>
                                Home
                            </Link>

                            <Link className={cx('about-item')} to={config.routes.about}>
                                About
                            </Link>
                        </div>
                    </div>
                    <div className={cx('footer-section')}>
                        <h3>Contact</h3>
                        <p>Email: nhombantranh@gmail.com</p>
                        <p>Phone: 0796699805 (Mr.Thinh)</p>
                    </div>
                </div>
                <div className={cx('footer-bottom')}>
                    <p>&copy; 2023 My Website. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
