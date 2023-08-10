import { useState } from "react";
import styles from './AddCategories.module.scss';
import axios from "axios";

function AddCategories(props) {
    const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;

    if(categoryName.trim() == ""){
      // set lỗi ở đây nha anh duy 

      flag = false;
    }

    if(!flag){
      // hiện lỗi ở đây
    }else{
      const data = {
        categoryName:categoryName
      }
      axios.post(' https://art-clear-backend.onrender.com/api/auth/Admin/AddCategories',data)
      .then(res=>{
        props.getCategories(res.data)
        // console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
    }
    // Reset form
    setCategoryName('');
    closeForm();

  };

  return (
    <div className={styles.popup_form}>
      <button className={styles.button_add} onClick={openForm}>Add category</button>
      {isOpen && (
        <div className={styles.overlay}>
        <div className={styles.popup}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h2>Add category</h2>

            <label htmlFor="name"><b>Category Name</b></label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />

            <button type="submit" className={styles.btn}>Add</button>
            <button type="button" className={styles.btn || styles.cancel} onClick={closeForm}>Cancel</button>
          </form>
        </div>
      </div>
      )}
    </div>
  )
}

export default AddCategories;