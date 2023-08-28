import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeleteProduct(props) {
    function handleDelete() {
        axios.delete(' http://localhost:8080/api/auth/deleteImage/' + props.id);
        props.getRunAgain('run');
    }
    return (
        <>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </>
    );
}

export default DeleteProduct;
