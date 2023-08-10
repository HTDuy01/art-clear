import styles from '~/Admin/Artists/AddArtists.module.scss';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditProduct(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState('');
    const [editProduct, seteditProduct] = useState({
        artist_id: '',
        category_id: '',
        picture_name: '',
        description: '',
        quantity: '',
        price: '',
    });

    useEffect(() => {
        axios.get(' https://art-clear-backend.onrender.com/api/auth/detailsImage/' + props.id).then((res) => {
            seteditProduct({
                artist_id: res.data.artistId,
                category_id: res.data.categoryId,
                picture_name: res.data.pictureName,
                description: res.data.description,
                quantity: res.data.quantity,
                price: res.data.price,
            });
        });
    }, [props.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        seteditProduct((state) => ({ ...state, [name]: value }));
    };

    const openForm = () => {
        setIsOpen(true);
    };

    const closeForm = () => {
        setIsOpen(false);
    };

    const arrTypeImage = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState('');
    function handleFile(e) {
        setFile(e.target.files[0]);
        const files = e.target.files[0];
        const reader = new FileReader();

        if (files) {
            reader.readAsDataURL(files);
        }
        reader.onload = () => {
            // reader.result là URL dữ liệu (data URL) chứa dữ liệu của tệp tin đã chọn.
            setSelectedImage(reader.result);
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        console.log(editProduct);
        if (editProduct.artist_id == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (editProduct.category_id == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (editProduct.picture_name == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (editProduct.description == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (editProduct.quantity == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        }
        if (editProduct.price == '') {
            // set lỗi ở đây nha anh duy

            flag = false;
        } else {
            if (isNaN(editProduct.price)) {
                flag = false;
                alert('Vui lòng nhập một số hợp lệ');
            }
        }

        if (file == '') {
            // set lỗi ở đây
        } else {
            // console.log(file.type);
            const typeFile = file.type;
            const TypeImg = typeFile.split('/').pop();

            if (!arrTypeImage.includes(TypeImg)) {
                // set lỗi "file bạn chọn không phải ảnh" + typeFile;
                flag = false;
                alert('không phải file ảnh' + typeFile);
            }
        }

        if (!flag) {
            // hiện lỗi ở đây
        } else {
            let formData = new FormData();
            formData.append('artist_id', editProduct.artist_id);
            formData.append('category_id', editProduct.category_id);
            formData.append('picture_name', editProduct.picture_name);
            formData.append('description', editProduct.description);
            formData.append('quantity', editProduct.quantity);
            formData.append('price', editProduct.price);
            if (file !== '') {
                formData.append('file', file);
            }
            axios
                .put(' https://art-clear-backend.onrender.com/api/auth/editImage/' + props.id, formData)
                .then((res) => {
                    props.getRunAgain('run');
                    // console.log(res);
                    closeForm();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className={styles.popup_form}>
            <button className={styles.button_add} onClick={openForm}>
                Edit
            </button>
            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h2>Edit Product</h2>

                            <label htmlFor="artist_id">
                                <b>Artist</b>
                            </label>
                            <input type="text" name="artist_id" value={editProduct.artist_id} onChange={handleChange} required />
                            <label htmlFor="category_id">
                                <b>Category</b>
                            </label>
                            <input type="text"  name="category_id" value={editProduct.category_id} onChange={handleChange} required />
                            <label htmlFor="picture_name">
                                <b>Name</b>
                            </label>
                            <input type="text"  name="picture_name" value={editProduct.picture_name} onChange={handleChange} required />
                            <label htmlFor="description">
                                <b>Description</b>
                            </label>
                            <input type="text"  name="description" value={editProduct.description} onChange={handleChange} required />
                            <label htmlFor="quantity">
                                <b>Quantity</b>
                            </label>
                            <input type="text"  name="quantity" value={editProduct.quantity} onChange={handleChange} required />
                            <label htmlFor="price">
                                <b>Price</b>
                            </label>
                            <input type="text"  name="price" value={editProduct.price} onChange={handleChange} required />
                            <label>
                                <b>Iamge</b>
                            </label>
                            <input type="file" name="file" multiple onChange={handleFile} />
                            {selectedImage && <img width="40%" src={selectedImage} alt="Uploaded" />}

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

export default EditProduct;