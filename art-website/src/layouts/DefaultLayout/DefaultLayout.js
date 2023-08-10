import { useLocation } from 'react-router-dom';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Footer from '~/layouts/components/Footer';

import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const params = useLocation();

    return (
        <div className={cx('wrapper')}>
            <Header />
            {params['pathname'].includes('Admin') ? '' : <Sidebar />}

            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
