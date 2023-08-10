import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useContext, useState } from 'react';
import { Context } from '~/Context/UserContext';
// import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const defaulnFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaulnFn }) {
    // const navigate = useNavigate();
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    let valueTotal = useContext(Context);
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            const isLogin = !!item.separate;

            return (
                <>
                    {' '}
                    <MenuItem
                        key={index}
                        data={item}
                        onClick={() => {
                            if (isParent) {
                                setHistory((prev) => [...prev, item.children]);
                            } else {
                                onChange(item);
                            }
                            if (isLogin) {
                                const obj = {};

                                if (Object.keys(obj).length == 0) {
                                    valueTotal.setTongSoLuong(0);
                                }
                                localStorage.removeItem('checkLogin');
                                localStorage.removeItem('user');
                                localStorage.removeItem('level');
                                localStorage.removeItem('cart');
                            }else{

                            }
                        }}
                    />
                </>
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
        console.log(history);
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy interactive placement="bottom-end" offset={[12, 8]} delay={[0, 800]} hideOnClick={hideOnClick} render={renderResult} onHide={handleReset}>
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
