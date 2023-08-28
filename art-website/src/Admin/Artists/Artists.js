import { useEffect, useState } from 'react';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import styles from './Artists.module.scss';
import SidebarAdmin from '~/Admin/SidebarAdmin';
import config from '~/config';
import DeleteArtists from './DeleteArtists';
import { Link } from 'react-router-dom';
import AddArtists from './AddArtists';
import EditArtists from './EditArtists';

function Artists(props) {
    const [artists, setArtists] = useState('');
    const [runAgain, setRunAgain] = useState('stop');

    // const params = useParams();

    useEffect(() => {
        axios.get(' http://localhost:8080/api/auth/ListArtists').then((res) => {
            setArtists(res.data);
            setRunAgain('stop');
        });
    }, [runAgain]);

    function getArtists(data) {
        let concatArray = artists.concat(data);
        setArtists(concatArray);
    }

    function getRunAgain(data) {
        setRunAgain(data);
    }

    function tableArtists() {
        return Object.keys(artists).map((key, index) => {
            return (
                <tr scope="row" key={artists[key].id}>
                    <td>{artists[key].id}</td>
                    <td>{artists[key].name}</td>
                    <td>{artists[key].biography}</td>
                    <td>{artists[key].email}</td>
                    <td>{artists[key].phone}</td>

                    <td>
                        <DeleteArtists getRunAgain={getRunAgain} id={artists[key].id} />

                        <button type="button" class="btn">
                            <EditArtists getRunAgain={getRunAgain} id={artists[key].id} />
                        </button>
                    </td>
                </tr>
            );
        });
    }

    let user = JSON.parse(localStorage.getItem('user'));
    // console.log(user.data.roles[0]["role_ID"]);

    return (
        <div className={styles.container_Main}>
            <SidebarAdmin />
            <div className={styles.container_Form}>
                <div>
                    <h1>Artists Management</h1>
                </div>
                <div className={styles.menu2}>
                    <AddArtists getArtists={getArtists} />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Biography</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tableArtists()}</tbody>
                </table>
            </div>
        </div>
    );
}
export default Artists;
