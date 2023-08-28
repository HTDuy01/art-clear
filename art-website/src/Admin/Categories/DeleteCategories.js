import axios from 'axios';

function DeleteCategories(props) {
    function handleDelete() {
        axios.delete(' http://localhost:8080/api/auth/Admin/deleteCategories/' + props.id);
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

export default DeleteCategories;
