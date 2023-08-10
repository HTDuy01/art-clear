import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './AccountItem.module.scss';

const cx = classNames.bind(style);

function AccountItem({ data, onClick }) {
    return (
        <Link to={'/productDetails/' + data.id} className={cx('wrapper')}>
            <div className={cx('info')} onClick={onClick}>
                <h4 className={cx('name')}>
                    <span>{data.pictureName}</span>
                </h4>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
