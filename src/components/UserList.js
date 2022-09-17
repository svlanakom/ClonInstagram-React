import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function UserList({ modalIsOpen, setIsOpen, userToEdite, setUserToEdite }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3003/users/get`, {
            headers: {
                'Authorization': localStorage.getItem('token') ?? ''
            }
        }).then(response => {
            setUsers(response.data);
        });
    }, []);

    const deleteUser = (event) => {
        const email = event.target.dataset.email;
        axios.delete(`http://127.0.0.1:3003/users/delete/${email}`, {
            headers: {
                'Authorization': localStorage.getItem('token') ?? ''
            }
        }).then(response => {
            setUsers([...users].filter(user => user.email !== email));
        });
    };

    const editeUser = (event) => {
        const email = event.target.dataset.email;
        setUserToEdite(users.find(user => user.email === email))
        setIsOpen(true);
    };

    return (
        <ListGroup>
            {users.map((user) =>
                <ListGroupItem key={user._id}>
                    {user.email}
                        <Button
                            variant='danger'
                            data-email={user.email}
                            onClick={deleteUser}
                        >
                            Delete
                        </Button>
                        <Link
                            className='btn btn-primary'
                            to='/edite'
                            data-email={user.email}
                            onClick={editeUser}
                        >
                            Edite
                        </Link>
                </ListGroupItem>)}
        </ListGroup>
    );
}

export default UserList;