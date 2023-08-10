import React, { useEffect, useState } from 'react';
import styles from './AddArtists.module.scss';

import axios from 'axios';


function EditArtists(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [editArtists, seteditArtists] = useState({
            name: "",
            biography: "",
            email: "",
            phone: ""
    });

    useEffect(()=>{
        axios.get(' https://art-clear-backend.onrender.com/api/auth/artistDetails/' + props.id)
        .then(res=>{
            seteditArtists({
                name: res.data.name,
                biography: res.data.biography,
                email: res.data.email,
                phone: res.data.phone
          })
        })
    },[props.id])
    
    const handleChange = (e) => {
            const { name, value } = e.target;
            seteditArtists((state) => ({ ...state, [name]: value }));
    };
    
    const openForm = () => {
      setIsOpen(true);
    };
  
    const closeForm = () => {
      setIsOpen(false);
    };
  
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let flag = true;
  
      if(editArtists.name.trim() == ""){
        // set lỗi ở đây nha anh duy 
  
        flag = false;
      }
      if(editArtists.email.trim() == ""){
        // set lỗi ở đây nha anh duy 
  
        flag = false;
      }
      if(editArtists.biography.trim() == ""){
        // set lỗi ở đây nha anh duy 
  
        flag = false;
      }
      if(editArtists.phone.trim() == ""){
        // set lỗi ở đây nha anh duy 
  
        flag = false;
      }
      
      
  
      if(!flag){
        // hiện lỗi ở đây
      }else{
        const data = {
            name: editArtists.name,
            biography: editArtists.biography,
            email: editArtists.email,
            phone: editArtists.phone
        }
        axios.put(' https://art-clear-backend.onrender.com/api/auth/Admin/UpdateArtists/'+ props.id,data)
        .then(res=>{

            props.getRunAgain("run")
            // console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })
      }
      // Reset form
     
      closeForm();
  
    };
  
    return (
      <div className={styles.popup_form}>
        <button className={styles.button_add} onClick={openForm}>Edit Artists</button>
        {isOpen && (
          <div className={styles.overlay}>
          <div className={styles.popup}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h2>Add Artists</h2>
  
              <label htmlFor="name"><b>Name</b></label>
              <input
                type="text"
                name="name"
                value={editArtists.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="biography"><b>Biography</b></label>
              <input
                type="text"
                
                name="biography"
                value={editArtists.biography}
                onChange={handleChange}
                required
              />
              <label htmlFor="email"><b>Email</b></label>
              <input
                type="text"
                
                name="email"
                value={editArtists.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone"><b>Phone</b></label>
              <input
                type="text"
                
                name="phone"
                value={editArtists.phone}
                onChange={handleChange}
                required
              />
  
              <button type="submit" className={styles.btn}>Confirm</button>
              <button type="button" className={styles.btn || styles.cancel} onClick={closeForm}>Cancel</button>
            </form>
          </div>
        </div>
        )}
      </div>
    )
}

export default EditArtists;