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

function Change_Password(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputPassword((state) => ({ ...state, [name]: value }));
    };

    const [inputPassword, setInputPassword] = useState({
        pass1: '',
        pass2: '',
    });

    const handleSumbmit = (e) => {
        e.preventDefault();

        let flag = true;
        if (inputPassword.pass1 !== inputPassword.pass2) {
            flag = false;
            alert('thais cong');
        }
        if (flag) {
            const formdata = new FormData();
            formdata.append('password', inputPassword.pass2);
            axios
                .put('http://localhost:8080/api/auth/editUser/' + props.id, formdata)
                .then((res) => {
                    console.log(res);
                    alert('Success');
                    return onClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Box>
            <FormLabel>Password</FormLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button colorScheme="yellow" style={{ marginRight: '10px' }} onClick={onOpen}>
                    change Password
                </Button>
            </div>

            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size="md">
                                <Input onChange={handleChange} name="pass1" pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter password" />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormLabel>Enter a new password</FormLabel>
                            <InputGroup size="md">
                                <Input onChange={handleChange} name="pass2" pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter password" />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSumbmit} colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Change_Password;
