import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {port} from "../config"

function LoginForm({ modalIsOpen, setIsOpen, isLogin, setIsLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onFormSubmit(event) {
        event.preventDefault();
        axios.post(`${port}/users/login`, {
            email, password
        }).then(response => {
            console.log(response.data);
            localStorage.setItem('token', `Bearer ${response.data.token}`);
            localStorage.setItem('email', response.data.email);
            setIsLogin(true);
            setIsOpen(false);
        });
    }

    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;
