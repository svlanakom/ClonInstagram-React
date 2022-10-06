import axios from "axios";
import React from "react";
import { Form, Button } from 'react-bootstrap';
import {port} from '../config'


function CreatePostForm() {

  const onFormSubmit= ( event ) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post(`${port}/createpost`,  formData, {
        headers: {
            'Authorization': localStorage.getItem('token') ?? ''

        }
    }).then(response => {
       event.target.reset()
    });

  }


    return(
        <Form onSubmit={onFormSubmit} className='mb-3'>

        <Form.Group className='mb-3' controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
                name='title'
                type='text'
              
            />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>description</Form.Label>
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
    )

}

export default CreatePostForm;