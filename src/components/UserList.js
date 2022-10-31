import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { port } from '../config';

import { useAuthState } from '../context';

function UserList({ modalIsOpen, setIsOpen, userToEdite, setUserToEdite }) {
    const [users, setUsers] = useState([]);
    const authState = useAuthState();

    useEffect(() => {
        axios.get(`${port}/users/get`, {
            headers: {
                'Authorization': authState.token
            }
        }).then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.log(error.response?.status);
        });
    }, [authState]);

    const deleteUser = (event) => {
        const email = event.target.dataset.email;
        axios.delete(`${port}/users/delete/${email}`, {
            headers: {
                'Authorization': authState.token
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

    return (<>
        {authState.token ?
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button
                                    className='ms-1'
                                    variant='danger'
                                    data-email={user.email}
                                    onClick={deleteUser}
                                >
                                    Delete
                                </Button>
                                <Link
                                    className='btn btn-primary mx-1'
                                    to='/edite'
                                    data-email={user.email}
                                    onClick={editeUser}
                                >
                                    Edite
                                </Link>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            :
            <h3 className="d-flex justify-content-center mt-5">User list is not avaliable</h3>
        }
    </>
    );
}

export default UserList;