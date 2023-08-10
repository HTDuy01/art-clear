import classNames from 'classnames/bind';
import Category from '~/components/Category';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Category />
        </div>
    );
}

export default Sidebar;
