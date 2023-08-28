import axios from 'axios';

function DeleteArtists(props) {
    function handleDelete() {
        axios.delete(' http://localhost:8080/api/auth/Admin/deleteArtists/' + props.id).then((res) => {
            props.getRunAgain('run');
        });
    }
    return (
        <>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </>
    );
}

export default DeleteArtists;
