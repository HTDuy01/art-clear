import {
    Heading,
    FormLabel,
    Input,
    Button,
    Image,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    ModalFooter,
    useDisclosure,
    Box,
    Modal,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Change_Password from './Change_Password';

function UpdatePersonal(props) {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [show, setShow] = React.useState(false);

    const [id, setId] = useState({
        id: '',
    });

    const [input, setInput] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // gán giá trị cho input
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
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((state) => ({ ...state, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file); // Lưu trữ tệp tin được chọn
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result); // Hiển thị hình ảnh được chọn trên giao diện
            };
            reader.readAsDataURL(file); // Đọc tệp tin dưới dạng data URL
        }
        console.log('file', file);
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!input.name.trim()) {
            errors.name = 'Full Name is required';
            isValid = false;
        } else if (/\d/.test(input.name)) {
            errors.name = 'Full Name cannot contain numbers';
            isValid = false;
        }

        if (!input.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        if (!input.phone.trim()) {
            errors.phone = 'Phone is required';
            isValid = false;
        } else if (!/^[0-9]+$/.test(input.phone)) {
            errors.phone = 'Invalid phone number';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            let formdata = new FormData();

            formdata.append('username', input.username);
            // formdata.append('password', input.password);
            formdata.append('fullname', input.name);
            formdata.append('email', input.email);
            formdata.append('phone', input.phone);
            if (file != '') {
                formdata.append('file', file);
            }
            axios
                .put('http://localhost:8080/api/auth/editUser/' + id.id, formdata)
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('user', JSON.stringify(res));
                    alert('Success');
                    window.location.reload();
                    onClose();
                })
                .catch((err) => {
                    console.log(err);
                    alert('Thái công');
                });
        }
    };

    return (
        <Box>
            <FormLabel>update personal</FormLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button colorScheme="telegram" style={{ marginRight: '10px' }} onClick={onOpen}>
                    update personal
                </Button>
            </div>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Personal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form>
                            <div key={id.id} style={{ paddingRight: '8%', margin: '10px 0' }}>
                                <FormLabel>username</FormLabel>
                                <Input type="text" value={input.username} />

                                <FormLabel>Full Name</FormLabel>
                                <Input type="text" name="name" value={input.name} onChange={handleChange} />
                                {errors.name && <span style={{ color: 'red', fontSize: '10px' }}>{errors.name}</span>}

                                <FormLabel>Email</FormLabel>
                                <Input type="text" name="email" value={input.email} onChange={handleChange} />
                                {errors.email && <span style={{ color: 'red', fontSize: '10px' }}>{errors.email}</span>}

                                <FormLabel>Phone</FormLabel>
                                <Input type="text" name="phone" value={input.phone} onChange={handleChange} />
                                {errors.phone && <span style={{ color: 'red', fontSize: '10px' }}>{errors.phone}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Image borderRadius="full" boxSize="150px" src={selectedImage ? selectedImage : 'http://localhost:8080/api/auth/detailsUser/avatar/' + id.id} />
                                <input style={{ marginTop: '10px' }} type="file" multiple onChange={handleFile} />
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default UpdatePersonal;
