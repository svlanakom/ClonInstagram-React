import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import { useAuthState } from '../context';

function CreatePostForm() {
    const authState = useAuthState();

    const onFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        axios.post("http://localhost:3003/createpost", formData, {
            headers: {
                'Authorization': authState.token
            }
        }).then(response => {
            event.target.reset();
        });
    }

    return (
        <Form onSubmit={onFormSubmit} className='mb-3'>
            <Form.Group className='mb-3' controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name='title'
                    type='text'
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    name='description'
                    type='text'
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formImage'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    name='image'
                    type='file'
                />
            </Form.Group>

            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
    );
}

export default CreatePostForm;