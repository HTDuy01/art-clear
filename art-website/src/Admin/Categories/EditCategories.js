import { useEffect, useState } from 'react';
import styles from '~/Admin/Artists/AddArtists.module.scss';
import axios from 'axios';

function EditCategories(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editCategories, seteditCategories] = useState({
        name: '',
    });

    useEffect(() => {
        axios.get(' http://localhost:8080/api/auth/categoriesDetails/' + props.id).then((res) => {
            seteditCategories({
                name: res.data.categoryName,
            });
        });
    }, [props.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        seteditCategories((state) => ({ ...state, [name]: value }));
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

        if (editCategories.name.trim() == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }

        if (!flag) {
            // hiện lỗi ở đây
        } else {
            const data = {
                categoryName: editCategories.name,
            };
            axios
                .put(' http://localhost:8080/api/auth/Admin/UpdateCategories/' + props.id, data)
                .then((res) => {
                    // console.log(res);
                    props.getRunAgain('run');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        closeForm();
    };

    return (
        <div className={styles.popup_form}>
            <button className={styles.button_add} onClick={openForm}>
                Edit Categories
            </button>
            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h2>Edit Categories</h2>

                            <label htmlFor="name">
                                <b>Name</b>
                            </label>
                            <input type="text" name="name" value={editCategories.name} onChange={handleChange} required />

                            <button type="submit" className={styles.btn}>
                                Confirm
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

export default EditCategories;
