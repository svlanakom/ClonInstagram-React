import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { port } from '../config';


function EditeForm({ modalIsOpen, setIsOpen, userToEdite, setUserToEdite }) {
    const posibleCountries = ['', 'Ukraine', 'Poland', 'Deutch'];
    const posibleHobbies = ['Sport', 'Films', 'Books', 'Drowing'];

  const [username, setUsername] = useState('');
  const[sex, setSex] = useState('');
  const[country, setCountry] = useState('');
  const[hobby, setHobby] = useState([])
  const[birthdate, setBirthdate] = useState(new Date())

    const onFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`${port}/users/update`, {
            _id: userToEdite._id,
            username,
            sex,
            country,
            hobby,
            birthdate

    }, {
            headers: {
                'Authorization': localStorage.getItem('token') ?? ''
            }
        }).then(response => {
            //
         });
        setIsOpen(false);
    };
    useEffect(() => {
        
      setUsername(userToEdite.username);
      setSex(userToEdite.sex  ?? '');
      setCountry(userToEdite.country ?? '') ;
      setHobby(userToEdite.hobby ?? []);
      setBirthdate(userToEdite.birthdate  ?? new Date());
    }, [userToEdite]);
    return (
        <>
            <Form onSubmit={onFormSubmit}>

                <Form.Group className='mb-3' controlId='formName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name='name'
                        type='text'
                        value={username}
                        onChange={event => {setUsername(event.target.value)}}
                    />
                </Form.Group>
                
                <Form.Group className='mb-3' controlId='formSex'>
                    <Form.Label>Sex</Form.Label>
                    <Form.Check
                        label='Male'
                        name='sex'
                        type='radio'
                        checked={sex === 'Male' ? true : false}
                        onChange={()=> { setSex('Male') }}
                    />
                    <Form.Check
                        label='Famale'
                        name='sex'
                        type='radio'
                        checked={sex === 'Famale' ? true : false}
                        onChange={() => { setSex('Famale') }}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formCountry'>
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                        name='country'
                        value={country}
                        onChange={event => {setCountry(event.target.value)}}
                    >
                        {posibleCountries.map((country, index) =>
                            <option key={index} value={country}>{country}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formHobby'>
                    <Form.Label>Hobby</Form.Label>
                    {posibleHobbies.map((pHobby, index) =>
                        <Form.Check
                            key={index}
                            label={pHobby}
                            name='hobby'
                            type='switch'
                            checked={hobby.includes(pHobby) ? true : false}
                            onChange={event => {
                                if(hobby.includes(pHobby))
                                setHobby(hobby.filter(item => item !== pHobby));
                                else
                                setHobby([...hobby, pHobby]);
                                  
                            }}
                        />)}
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBirthdate'>
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                        type='date'
                        name='birthdate'
                        value={new Date(birthdate).toISOString().substring(0, 10)}
                        onChange={event => {setBirthdate(event.target.value); }}
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Submit
                </Button>
                <Button variant='danger' type='button' className='ms-2' onClick={() => setIsOpen(false)}>
               Cancel
            </Button>
            </Form>
        </>
    );
}

export default EditeForm;