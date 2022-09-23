import axios from "axios";
import React from "react";
import { Form, Button } from 'react-bootstrap'


function CreatePostForm() {

  const onFormSubmit= ( event ) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post("http://localhost:3003/createpost",  formData, {
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
                // value={title}
                // onChange={event => {setUsername(event.target.value)}}
            />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formDescription'>
            <Form.Label>description</Form.Label>
            <Form.Control
                name='description'
                type='text'
            //    value={description}
                // onChange={event => {setUsername(event.target.value)}}
            />
        </Form.Group>
        
        <Form.Group className='mb-3' controlId='formImage'>
            <Form.Label>Image</Form.Label>
            <Form.Control
               
                name='image'
                type='file'
                // checked={sex === 'Male' ? true : false}
                // onChange={()=> { setSex('Male') }}
            />
           
        </Form.Group>

        <Button variant='primary' type='submit'>
            Submit
        </Button>
    </Form>
    )

}

export default CreatePostForm;