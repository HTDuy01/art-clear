/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './ListComment.module.scss';
import Comment from './Comment';
import classNames from 'classnames/bind';
import EditComment from './EditComment';
import DeteleComment from './DeteleComment';
import Action from './Action';

const cx = classNames.bind(styles);
function ListComment(props) {
    const [showInputComment, setShowInputComment] = useState(true);

    //show || hide
    function handelReplyComment(e) {
        if (showInputComment != true) {
            setShowInputComment(true);
            props.getId('');
        } else {
            setShowInputComment(e.target.id);
            props.getId(e.target.id);
            // console.log(showInputComment);
        }
        // console.log(showInputComment);
    }

    // transmit data up Liscomment,Comment
    function getComment(data) {
        // truyền giá trị lên lên lên lại cha để hiển thị lập tức ko cần load
        props.getCommentReply(data);

        // set lại giá trị rỗng sau khi Relay comment
        props.getId('');
        setShowInputComment(true);
    }

    // const [iduser, setiduser] = useState("")
    const check = localStorage.getItem('user');
    let obj = {};
    var iduser;
    if (check) {
        obj = JSON.parse(check);
        iduser = obj.data.id;
    }

    function getRunAgain(data) {
        if (data == false) {
            props.getRunAgain('run');
        }
    }

    function renderComment() {
        if (props.listComment) {
            return props.listComment.map((value, key) => {
                let nameUser1 = value.userName;
                let comment1 = value.comment;
                let id = value.id;

                const srcImg = `https://art-clear-backend.onrender.com/api/auth/detailsUser/avatar/${value.userId}`;

                if (value.commentId == 0) {
                    return (
                        <ul key={key} className={cx('cmt-list')}>
                            <li className={cx('cmt-item')}>
                                <div className={cx('img-user')}>
                                    <img src={srcImg} alt="123" />
                                    <p className={cx('name-user')}>{nameUser1}</p>
                                </div>
                                <div className={cx('content')}>
                                    <p className={cx('cmt-user')}>
                                        {comment1}
                                        {iduser == value.userId ? <Action getRunAgain={getRunAgain} id={id} /> : ''}
                                    </p>
                                    <a className={cx('btn-cmt')} id={id} onClick={handelReplyComment}>
                                        Reply
                                    </a>
                                    {showInputComment == id ? <Comment getComment={getComment} idREPLY={id} /> : ''}
                                </div>

                                {/* Check Show Actions*/}
                            </li>

                            {props.listComment.map((value, key2) => {
                                let nameUser2 = value.userName;
                                let comment2 = value.comment;
                                let idComment = value.commentId;
                                let id2 = value.id;
                                let userId2 = value.userId;
                                const srcImg2 = `https://art-clear-backend.onrender.com/api/auth/detailsUser/avatar/${userId2}`;
                                if (id == idComment) {
                                    return (
                                        <ul key={key2} className={cx('cmt-list')}>
                                            <li className={cx('cmt-item')}>
                                                <div className={cx('img-user')}>
                                                    <img src={srcImg2} alt="123" />
                                                    <p className={cx('name-user')}>{nameUser2}</p>
                                                </div>
                                                <div className={cx('content')}>
                                                    <p className={cx('cmt-user')}>
                                                        {comment2}
                                                        {iduser == value.userId ? <Action getRunAgain={getRunAgain} id={id2} /> : ''}
                                                    </p>
                                                </div>

                                                {/* Check Show Actions*/}
                                            </li>
                                        </ul>
                                    );
                                }
                            })}
                        </ul>
                    );
                }
            });
        }
    }
    return <>{renderComment()}</>;
}
export default ListComment;
