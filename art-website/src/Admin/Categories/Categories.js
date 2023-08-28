import { useEffect, useState } from 'react';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '~/Admin/Artists/Artists.module.scss';
import axios from 'axios';
import SidebarAdmin from '../SidebarAdmin/SiderbarAdmin';
import DeleteCategories from './DeleteCategories';
import { Link } from 'react-router-dom';
import AddCategories from './AddCategories';
import EditCategories from './EditCategories';

function Categories() {
    const [categories, setCategories] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [runAgain, setRunAgain] = useState('stop');

    function getRunAgain(data) {
        setRunAgain(data);
    }

    useEffect(() => {
        axios.get(' http://localhost:8080/api/auth/ListCategories').then((res) => {
            setCategories(res.data);
            setRunAgain('stop');
        });
    }, [runAgain]);

    function getCategories(data) {
        let concatArray = categories.concat(data);
        setCategories(concatArray);
    }

    function tableCategories() {
        return Object.keys(categories).map((key, index) => {
            return (
                <tr scope="row" key={categories[key].category_ID}>
                    <td>{categories[key].category_ID}</td>
                    <td>{categories[key].categoryName}</td>

                    <td>
                        <DeleteCategories getRunAgain={getRunAgain} id={categories[key].category_ID} />

                        <button type="button" className="btn">
                            <EditCategories getRunAgain={getRunAgain} id={categories[key].category_ID} />
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
                    <h1>Categories Management</h1>
                </div>
                <div className={styles.menu2}>
                    <AddCategories getCategories={getCategories} />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tableCategories()}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Categories;
