import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../context';

function Navigation({ modalIsOpen, setIsOpen }) {
    const authState = useAuthState();
    const authDispatch = useAuthDispatch();

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
                            !authState.token ?
                                <>
                                    <Link className="nav-link" onClick={() => setIsOpen(true)} to="/login">Login</Link>
                                    <Link className="nav-link" onClick={() => setIsOpen(true)} to="/registration">Registration</Link>
                                </>
                                :
                                <Nav.Link onClick={() => {
                                    authDispatch({ type: 'LOGOUT', payload: {} })
                                    localStorage.removeItem('userData');
                                }}>Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
