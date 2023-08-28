import styles from './AddProduct.module.scss';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddCategories from '../Categories/AddCategories';
import AddArtists from '../Artists/AddArtists';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function AddProduct() {
    let navigate = useNavigate();
    const [categories, setCategories] = useState('');
    const [artists, setArtists] = useState('');
    const [file, setFile] = useState('');
    const arrTypeImage = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
    const [addProduct, setProduct] = useState({
        picture_name: '',
        artist_id: '',
        category_id: '',
        description: '',
        quantity: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((state) => ({ ...state, [name]: value }));
        // console.log(addProduct);
    };

    // get data Categories, Artists
    useEffect(() => {
        axios
            .get(' http://localhost:8080/api/auth/ListCategories')
            .then((res) => {
                setCategories(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(' http://localhost:8080/api/auth/ListArtists')
            .then((res) => {
                setArtists(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function getCategories(data) {
        let concatArray = categories.concat(data);
        setCategories(concatArray);
    }
    // Categories
    function renderCategories() {
        return Object.keys(categories).map((key, value) => {
            return (
                <option key={key} value={categories[key].category_ID}>
                    {categories[key].categoryName}
                </option>
            );
        });
    }

    function getArtists(data) {
        let concatArray = artists.concat(data);
        setArtists(concatArray);
    }

    // Artists

    function renderArtists() {
        return Object.keys(artists).map((key, value) => {
            return (
                <option key={key} value={artists[key].id}>
                    {artists[key].name}
                </option>
            );
        });
    }
    const [selectedImage, setSelectedImage] = useState(null);

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
    function handleSubmit(e) {
        e.preventDefault();
        let flag = true;
        if (addProduct.picture_name.trim() === '') {
            flag = false;
        } else {
        }
        if (addProduct.artist_id.trim() === '') {
            flag = false;
        } else {
        }
        if (addProduct.category_id.trim() === '') {
            // set lỗi ở đây
            flag = false;
        } else {
        }
        if (addProduct.description.trim() === '') {
            // set lỗi ở đây
            flag = false;
        } else {
        }
        if (addProduct.quantity.trim() === '') {
            // set lỗi ở đây
            flag = false;
        } else {
        }
        if (addProduct.price.trim() === '') {
            // set lỗi ở đây
            flag = false;
        } else {
        }

        if (file == '') {
            // set lỗi ở đây
        } else {
            const typeFile = file.type;
            const TypeImg = typeFile.split('/').pop();

            if (!arrTypeImage.includes(TypeImg)) {
                // set lỗi "file bạn chọn không phải ảnh" + typeFile;
                flag = false;
                console.log('không phải file ảnh' + typeFile);
            } else {
            }
        }

        if (flag) {
            let formData = new FormData();
            formData.append('artist_id', addProduct.artist_id);
            formData.append('category_id', addProduct.category_id);
            formData.append('picture_name', addProduct.picture_name);
            formData.append('description', addProduct.description);
            formData.append('quantity', addProduct.quantity);
            formData.append('price', addProduct.price);
            formData.append('file', file);

            axios
                .post(' http://localhost:8080/api/auth/addImage', formData)
                .then((res) => {
                    // console.log(res);
                    setProduct({
                        picture_name: '',
                        artist_id: '',
                        category_id: '',
                        description: '',
                        quantity: '',
                        price: '',
                    });
                    setFile('');
                    navigate('/Admin/Product');
                })
                .catch((err) => {
                    console.log(err);
                    alert('thêm thất bại');
                });
            // console.log(addProduct);
        }
    }
    return (
        <>
            <span>
                {' '}
                <Link to={config.routes.Product}>
                    {' '}
                    <FontAwesomeIcon icon={faChevronLeft} />{' '}
                </Link>
            </span>
            <div className={styles.container_addCategories_addArtists}>
                <button className={styles.addCategories}>
                    <AddCategories getCategories={getCategories} />
                </button>
                <button className={styles.addArtists}>
                    <AddArtists getArtists={getArtists} />
                </button>
            </div>

            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.s1}>
                    <h1>Add Product</h1>
                </div>
                <div className="row mb-3">
                    <label for="inputName3" className="col-sm-2 col-form-label">
                        Name:{' '}
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputName3" name="picture_name" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputPhone3" className="col-sm-2 col-form-label">
                        Artist:{' '}
                    </label>
                    <div className="col-sm-10">
                        <select name="artist_id" onChange={handleChange}>
                            <option value="">Artists</option>
                            {renderArtists()}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputPhone3" className="col-sm-2 col-form-label">
                        Category:{' '}
                    </label>
                    <div class="col-sm-10">
                        <select name="category_id" onChange={handleChange}>
                            <option value="">Categories</option>
                            {renderCategories()}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="inputBiography3" className="col-sm-2 col-form-label">
                        description:{' '}
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputBiography3" name="description" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputPhone3" className="col-sm-2 col-form-label">
                        Quantity:{' '}
                    </label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="inputPhone3" name="quantity" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">
                        Price:{' '}
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputEmail3" name="price" onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="inputPhone3" className="col-sm-2 col-form-label">
                        name:{' '}
                    </label>
                    <div className="col-sm-10">
                        <input id="Image" type="file" name="file" multiple onChange={handleFile} />
                        {selectedImage && <img width="40%" src={selectedImage} alt="Uploaded" />}
                    </div>
                </div>
                <div className={styles.s1}>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </>
    );
}

export default AddProduct;
