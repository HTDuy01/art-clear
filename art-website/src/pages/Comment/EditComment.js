import { useEffect, useState } from 'react';
import styles from './EditComment.module.scss';
import axios from 'axios';
function EditComment(props){
    const [isOpen, setIsOpen] = useState(false);
    const [editComment, setEditComment] = useState("");

    useEffect(()=>{
      axios.get('https://art-clear-backend.onrender.com/api/auth/commentId/'+props.id)
      .then(res =>{
        setEditComment(res.data.comment)
      })
    },[])

    const handleChange = (e) => {
        setEditComment(e.target.value);
    };


    const openForm = () => {
      setIsOpen(true);
    };

    const closeForm = () => {
      setIsOpen(false);
      props.handleEdit(false)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
    
        
        if(!flag){
          // hiện lỗi ở đây
        }else{
          const data = {
              comment: editComment,
          }
          axios.put('https://art-clear-backend.onrender.com/api/auth/comment/edit/'+props.id,data)
          .then(res=>{
            props.getRunAgain(false)
            console.log(res);
          })
          .catch(err=>{
            // console.log(err);
          })
        }
        // Reset form
    
        closeForm();
    
      };
    //   console.log(props.id);
    return(
        <div className={styles.popup_form}>
        <button  onClick={openForm}>Edit</button>
        {isOpen && (
            
            <div className={styles.overlay}>
                <div className={styles.popup}>
                <button type="button" className={styles.close || styles.cancel} onClick={closeForm}>x</button>

                    <form className={styles.form_container} onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <input
                            type="text"
                            placeholder="Comment"
                            value={editComment}
                            onChange={handleChange}
                            required
                        />
                    <button type="submit" className={styles.btn}>Confirm</button>
                    </div>
                    </form>
                </div>
            </div>
        )}
        </div>
    )
}
export default EditComment;