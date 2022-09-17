import React, { useEffect } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

function Navigation({ modalIsOpen, setIsOpen, isLogin, setIsLogin }) {
    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            axios.get(`http://127.0.0.1:3003/users/get/${email}`, {
                headers: {
                    'Authorization': localStorage.getItem('token') ?? ''
                }
            }).then(response => {
                if (Object.keys(response.data).length > 0)
                    setIsLogin(true);
            });
        }
    }, [setIsLogin]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="info" variant="light">
            <Container>
                <Navbar.Brand><Link className="nav-link" to="/">Clone-Instagram</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/about">About</Link>
                        <Link className="nav-link" to="/contact">Contact</Link>
                        <Link className="nav-link" to="/posts">Posts</Link>
                    </Nav>
                    <Nav>
                        {
                            !isLogin ?
                            <>
                                <Link className="nav-link" onClick={() => setIsOpen(true)} to="/login">Login</Link>
                                <Link className="nav-link" onClick={() => setIsOpen(true)} to="/registration">Registration</Link>
                            </>
                            :
                            <Nav.Link onClick={() => {
                                setIsLogin(false);
                                localStorage.removeItem('token');
                                localStorage.removeItem('email');
                            }}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
