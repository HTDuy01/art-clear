import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './DeteleComment.css';
import EditComment from './EditComment';
import DeteleComment from './DeteleComment';
function Action(props) {
    const [showNotification, setShowNotification] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowNotification(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowNotification = () => {
        setShowNotification(true);
    };

    const handleDetele = () => {
        // setShowNotification(false);
    };
    function getRunAgain(data) {
        if (data == false) {
            props.getRunAgain(false);
        }
    }
    const handleEdit = (e) => {
        if (e == false) {
            setShowNotification(e);
        }
    };

    // set id
    const id = props.id;
    return (
        <>
            <button className="Action" onClick={handleShowNotification}>
                ...
            </button>

            {showNotification && (
                <div className="notification" ref={formRef}>
                    <button onClick={handleEdit}>
                        <EditComment getRunAgain={getRunAgain} handleEdit={handleEdit} id={id} />
                    </button>
                    <button onClick={handleDetele}>
                        <DeteleComment getRunAgain={getRunAgain} handleEdit={handleEdit} id={id} />
                    </button>
                </div>
            )}
        </>
    );
}
export default Action;
