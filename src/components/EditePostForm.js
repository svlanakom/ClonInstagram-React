import React, { useEffect, useState } from 'react';
import { Form, Button, Figure } from 'react-bootstrap';
import axios from 'axios';
import { port } from '../config';
import { useAuthState } from '../context';

function EditePostForm({ modalIsOpen, setIsOpen, postToEdite, setPostToEdite }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const authState = useAuthState();

    const onFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        axios.post(`${port}/editepost/${postToEdite._id}`, formData, {
            headers: {
                'Authorization': authState.token
            }
        }).then(response => {
            setIsOpen(false);
        });
    };

    useEffect(() => {
        setTitle(postToEdite.title);
        setDescription(postToEdite.description);
        setImage(postToEdite.imagePath);
    }, [postToEdite]);

    return (
        <Form onSubmit={onFormSubmit} className='mb-3'>
            <Form.Group className='mb-3' controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name='title'
                    type='text'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    name='description'
                    type='text'
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formImage'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    name='image'
                    type='file'
                    onChange={event => setImage(event.target.value)}
                />
                <Figure className='mt-3'>
                <Figure.Image
                    width={180}
                    src={`${port}/${postToEdite.imagePath}`}
                    alt={postToEdite.title}
                />
                </Figure>
            </Form.Group>

            <Button variant='primary' type='submit'>
                Submit
            </Button>
            <Button variant='danger' type='button' className='ms-2' onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
        </Form>
    );
}

export default EditePostForm;