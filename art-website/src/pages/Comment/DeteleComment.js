import axios from 'axios';
import { useState } from 'react';
import './DeteleComment.css';
function DeteleComment(props) {
    const [showNotification, setShowNotification] = useState(false);
    const handleCancel = () => {
        setShowNotification(false);
    };
    const hancleDetele = () => {
        axios
            .delete('http://localhost:8080/api/auth/comment/delete/' + props.id)
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        setShowNotification(false);
        props.handleEdit(false);
        props.getRunAgain(false);
    };

    const handleShowNotification = () => {
        setShowNotification(true);
    };

    return (
        <div>
            <button onClick={handleShowNotification}>Detele</button>

            {showNotification && (
                <div className="notificationDetele">
                    <p>You want to delete this comment ?</p>
                    <button className="Cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="Oke" onClick={hancleDetele}>
                        OK
                    </button>
                </div>
            )}
        </div>
    );
}
export default DeteleComment;
