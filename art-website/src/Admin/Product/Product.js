import { useEffect, useState } from 'react';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '~/Admin/Product/Product.module.scss';
import SidebarAdmin from '../SidebarAdmin/SiderbarAdmin';
import DeleteProduct from './DeleteProduct';
import { Link, useParams } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import './test.css';
import EditProduct from './EditProduct';
function Product({ size = '' }) {
    const [product, setProduct] = useState('');
    const [runAgain, setRunAgain] = useState('stop');
    const params = useParams();

    useEffect(() => {
        axios.get(` http://localhost:8080/api/auth/listImage?size=${size}`).then((res) => {
            setProduct(res.data.images);
            setRunAgain('stop');
        });
    }, [runAgain]);

    function getRunAgain(data) {
        setRunAgain(data);
    }

    function tableProduct() {
        return Object.keys(product).map((key, inex) => {
            return (
                <tr scope="row" key={product[key].id}>
                    <td>{product[key].id}</td>
                    <td>{product[key].artistId}</td>
                    <td>{product[key].categoryId}</td>
                    <td>{product[key].pictureName}</td>
                    <td>{product[key].description}</td>
                    <td>{product[key].price}</td>
                    <td>{product[key].quantity}</td>
                    <td className="image-zoom">
                        <img className="zoom-image" src={' http://localhost:8080/api/auth/upload/product/' + product[key].id} width="100px" />
                    </td>
                    <td>
                        <DeleteProduct getRunAgain={getRunAgain} id={product[key].id} />

                        <button type="button" className="btn">
                            <EditProduct getRunAgain={getRunAgain} id={product[key].id} />
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className={styles.container_Main}>
            <SidebarAdmin />
            <div className={styles.container_Form}>
                <div>
                    <h1>Product Management</h1>
                </div>
                <div className={styles.menu2}>
                    <Link to={config.routes.AddProduct}>
                        <button type="button" className="btn btn-success">
                            Add new
                        </button>
                    </Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Category</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tableProduct()}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
