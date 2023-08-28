import React, { useState } from 'react';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './AddArtists.module.scss';
import axios from 'axios';

function AddArtists(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [addArtists, setAddArtists] = useState({
        name: '',
        biography: '',
        email: '',
        phone: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddArtists((state) => ({ ...state, [name]: value }));
    };

    const openForm = () => {
        setIsOpen(true);
    };

    const closeForm = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;

        if (addArtists.name.trim() == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (addArtists.email.trim() == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (addArtists.biography.trim() == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (addArtists.phone.trim() == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }

        if (!flag) {
            // hiện lỗi ở đây
        } else {
            const data = {
                name: addArtists.name,
                biography: addArtists.biography,
                email: addArtists.email,
                phone: addArtists.phone,
            };
            axios
                .post('http://localhost:8080/api/auth/Admin/AddArtists', data)
                .then((res) => {
                    props.getArtists(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // Reset form
        setAddArtists({
            name: '',
            biography: '',
            email: '',
            phone: '',
        });
        closeForm();
    };

    return (
        <div className={styles.popup_form}>
            <button className={styles.button_add} onClick={openForm}>
                Add Artists
            </button>
            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h2>Add Artists</h2>

                            <label htmlFor="name">
                                <b>Name</b>
                            </label>
                            <input type="text" placeholder="Artist Name" name="name" value={addArtists.name} onChange={handleChange} required />
                            <label htmlFor="biography">
                                <b>Biography</b>
                            </label>
                            <input type="text" placeholder="Biography" name="biography" value={addArtists.biography} onChange={handleChange} required />
                            <label htmlFor="email">
                                <b>Email</b>
                            </label>
                            <input type="text" placeholder="Email" name="email" value={addArtists.email} onChange={handleChange} required />
                            <label htmlFor="phone">
                                <b>Phone</b>
                            </label>
                            <input type="text" placeholder="Phone" name="phone" value={addArtists.phone} onChange={handleChange} required />

                            <button type="submit" className={styles.btn}>
                                Add
                            </button>
                            <button type="button" className={styles.btn || styles.cancel} onClick={closeForm}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AddArtists;
