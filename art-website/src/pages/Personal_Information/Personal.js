import { Heading, FormLabel, Input, Button, Image, useDisclosure } from '@chakra-ui/react';
import styles from './Personal.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdatePersonal from './UpdatePersonal';
import Change_Password from './Change_Password';
function Personal() {
    const [selectedImage, setSelectedImage] = useState(null);
    // const [file, setFile] = useState("");
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [id, setId] = useState({
        id: '',
    });

    const [input, setInput] = useState({
        username: '',
        // password: '',
        name: '',
        email: '',
        phone: '',
    });

    // gán giá trị cho input
    const [src, setSrc] = useState('');
    useEffect(() => {
        let obj = {};
        const check = localStorage.getItem('user');
        if (check) {
            obj = JSON.parse(check);
        }
        setId({
            id: obj.data.id,
        });
        setInput({
            username: obj.data.username,
            // password: obj.data.password,
            name: obj.data.fullname,
            email: obj.data.email,
            phone: obj.data.phone,
        });
        setSrc('http://localhost:8080/api/auth/detailsUser/avatar/' + obj.data.id);
    }, []);

    // đẩy dữ liệu lên api

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <div key={id.id}>
                    <Heading className={styles.heading} size="lg" fontSize="50px">
                        Personal information
                    </Heading>

                    <FormLabel>username</FormLabel>
                    <Input className={styles.blackColor} type="text" value={input.username} disabled />

                    {/* <Change_Password id={id.id} /> */}

                    <FormLabel>Full Name</FormLabel>
                    <Input className={styles.blackColor} type="text" name="name" value={input.name} disabled />

                    {/* <FormLabel>Password</FormLabel> */}
                    <Change_Password id={id.id} />

                    <FormLabel>Email</FormLabel>
                    <Input className={styles.blackColor} type="text" name="email" value={input.email} disabled />

                    <FormLabel>Phone</FormLabel>
                    <Input className={styles.blackColor} type="text" name="phone" value={input.phone} disabled />

                    <UpdatePersonal />
                </div>
                <div className={styles.images}>
                    <Image borderRadius="full" boxSize="150px" src={src ? src : 'http://localhost:8080/api/auth/detailsUser/avatar/' + id.id} />
                </div>
            </form>
        </div>
    );
}

export default Personal;
