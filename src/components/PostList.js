import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { port } from '../config';
import { useAuthState } from '../context';

function PostList({
    modalIsOpen,
    setIsOpen,
    postToEdite,
    setPostToEdite,
    posts,
    setPosts
}) {
    const authState = useAuthState();

    const deletePost = (event) => {
        axios.delete(`${port}/deletepost/${event.target.dataset.id}`, {
            headers: {
                'Authorization': authState.token
            }
        }).then(response => {
            setPosts(posts.filter(post => post._id !== event.target.dataset.id))
        });
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        axios.get(`${port}/posts`, {
            headers: {
                'Authorization': userData.token ?? ''
            }
        }).then(response => {
            setPosts(response.data);
        }).catch(error => {
            console.log(error.response?.status ?? error);
        });
    }, [posts.length]);

    return (
        <>
            <Row xs={1} sm={2} md={4}>
                {posts.map(post =>
                    <Col key={post._id} className='mt-3'>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={`${port}/${post.imagePath}`}
                                alt={post.title}
                            />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    {post.description}
                                </Card.Text>
                                <Link
                                    className='btn btn-primary'
                                    to='/editepost'
                                    onClick={() => {
                                        setIsOpen(true);
                                        setPostToEdite(post);
                                    }}
                                >
                                    Edite
                                </Link>
                                <Button
                                    variant='danger'
                                    className='ms-2'
                                    onClick={deletePost}
                                    data-id={post._id}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default PostList;