import { useEffect, useState,  } from 'react';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import SidebarAdmin from '../SidebarAdmin/SiderbarAdmin';
import styles from '~/Admin/Artists/Artists.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddArtists from '../Artists/AddArtists';
import IssueInvoice from './IssueInvoice';

function Invoices(props){
    const navigate = useNavigate()
    const [invoices, setInvoices] = useState('');
    useEffect(() => {
        axios.get(" https://art-clear-backend.onrender.com/api/auth/list/invoices")
            .then(res => {
                setInvoices(res.data);
                
            })
    },[])
    
    
    
    function tableInvoices() {

        
        return Object.keys(invoices).map((key, index) => {

            return (
                <tr scope="row" key={key} >
                    <td>{invoices[key].id}</td>
                    <td>{invoices[key].buyerName}</td>
                    <td>{JSON.stringify(invoices[key].items)}</td>
                    <td>{invoices[key].purchaseDate}</td> 
                    <td>{invoices[key].totalAmount}</td>
                    <td><IssueInvoice id={invoices[key].id}/></td>


                </tr>
            )
        })
    }

    return (

        <div className={styles.container_Main}>
                <SidebarAdmin />
            <div className={styles.container_Form}>
                <div>
                    <h1>Invoices Management</h1>
                </div>
                <div className={styles.menu2}>
                        
                </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Customer name</th>
                                <th scope="col">Product</th>
                                <th scope="col">Purchase Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableInvoices()}
                        </tbody>
                    </table>



            </div>
        </div>


);
}
export default Invoices;