/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './Comment.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Comment(props) {
    const params = useParams();
    const navigate = useNavigate();
    const checkLogin = localStorage.getItem('checkLogin');
    const [comment, setComment] = useState('');

    const check = localStorage.getItem('user');
    let obj = {};
    if (check) {
        obj = JSON.parse(check);
    }
    // console.log(obj.status);

    function handleSubmit(e) {
        e.preventDefault();
        if (checkLogin) {
            if (comment.trim() == '') {
                alert('vui lòng nhập'); 
            } else {
                // const
                // let x = 1
                if (check) {
                    let userId, userName;
                    userId = obj.data.id;
                    userName = obj.data.fullname;
                    const data = {
                        imageId: params.id,
                        userId: userId,
                        userName: userName,
                        commentId: props.idREPLY ? props.idREPLY : 0,
                        comment: comment,
                    };
                    axios
                        .post('https://art-clear-backend.onrender.com/api/auth/comment/add', data)
                        .then((res) => {
                            // console.log(res.data);

                            // truyền giá trị lên lên lên lại cha để hiển thị lập tức ko cần load
                            props.getComment(res.data);

                            // set lại giá trị rỗng sau khi Relay comment
                            props.getId('');

                            props.getRunAgain('run');
                        })
                        .catch((err) => {
                            // console.log(err);
                        });

                    setComment('');
                }
            }
        } else {
            let answer = window.confirm("Please log in !");
            if (answer) {
                navigate('/login')
            }
            else {
                
            }
        }
    }
    return (
        <section>
            <div className="text-area">
                {/* <div className="blank-arrow">
                    <label>Your Name</label>
                </div> */}
                <div className={cx('comment-post')}>
                    <textarea className={cx('textarea')} rows="2" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <Button className={cx('action')} primary small onClick={handleSubmit}>
                        Post a Comment
                    </Button>
                </div>
            </div>
        </section>
    );
}
export default Comment;
