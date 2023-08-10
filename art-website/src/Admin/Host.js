import { useLocation } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SiderbarAdmin";
import styles from '~/Admin/Artists/Artists.module.scss';
function Host(props) {
    const params = useLocation();

    return (
        
            <div className={styles.container_Main}>
                    {params['pathname'].includes('Admin')?<SidebarAdmin />:""}
                <div className={styles.container_Form}>
                        <h1>Admin Page</h1>
                </div>
            </div>

       

    );
}

export default Host;