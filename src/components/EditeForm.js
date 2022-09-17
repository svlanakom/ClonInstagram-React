import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditeForm({ modalIsOpen, setIsOpen, userToEdite, setUserToEdite }) {
    const posibleCountries = ['', 'Ukraine', 'Poland', 'Deutch'];
    const posibleHobbies = ['Sport', 'Films', 'Books', 'Drowing'];
    const onFormSubmit = (event) => {
        event.preventDefault();
        setIsOpen(false);
    };
    useEffect(() => {
        console.log(userToEdite);
    }, [userToEdite]);
    return (
        <>
            <Form onSubmit={onFormSubmit}>

                <Form.Group className='mb-3' controlId='formName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name='name'
                        type='text'
                        value={userToEdite.username}
                        onChange={event => {}}
                    />
                </Form.Group>
                
                <Form.Group className='mb-3' controlId='formSex'>
                    <Form.Label>Sex</Form.Label>
                    <Form.Check
                        label='Male'
                        name='sex'
                        type='radio'
                        checked={userToEdite.sex === 'Male' ? true : false}
                        onChange={event => {}}
                    />
                    <Form.Check
                        label='Famale'
                        name='sex'
                        type='radio'
                        checked={userToEdite.sex === 'Famale' ? true : false}
                        onChange={event => {}}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formCountry'>
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                        name='country'
                        value={userToEdite.country}
                        onChange={event => {}}
                    >
                        {posibleCountries.map((country, index) =>
                            <option key={index} value={country}>{country}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formHobby'>
                    <Form.Label>Hobby</Form.Label>
                    {posibleHobbies.map((hobby, index) =>
                        <Form.Check
                            key={index}
                            label={hobby}
                            name='hobby'
                            type='switch'
                            checked={userToEdite.hobby.includes(hobby) ? true : false}
                            onChange={event => {}}
                        />)}
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBirthdate'>
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                        type='date'
                        name='birthdate'
                      
                        onChange={event => {}}
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default EditeForm;