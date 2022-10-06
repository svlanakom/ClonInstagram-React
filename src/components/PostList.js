import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {port} from '../config'

function PostList({ modalIsOpen, setIsOpen, postToEdite, setPostToEdite }) {
    const [posts, setPosts] = useState([]);

    const deletePost = (event) => {
        axios.delete(`${port}/${event.target.dataset.id}`, {
            headers: {
                'Authorization': localStorage.getItem('token') ?? ''
            }
        });
    

    };

    useEffect(() => {
        axios.get(`${port}/posts`, {
            headers: {
                'Authorization': localStorage.getItem('token') ?? ''
            }
        }).then(response => {
            setPosts(response.data);
        });
    }, [posts, setPosts]);

    return (
        <>
            <Row xs={1} sm={3} md={2}>
                {posts.map(post =>
                    <Col>
                        <Card key={post._id} >
                            <Card.Img variant="top" src={`${port}/${post.imagePath}`} alt={post.title} />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.description}</Card.Text>
                                <Link
                                    className='btn btn-primary'
                                    to='/editepost'
                                    onClick={() => {
                                        setIsOpen(true)
                                        setPostToEdite(post)
                                    }}
                                >
                                    Edit
                                </Link>
                                <Button 
                                variant='danger'
                                 data-id={post._id}
                                 onClick={deletePost}>


                                    Delete

                                </Button>



                            </Card.Body>
                        </Card>
                    </Col>)}

            </Row>
        </>
    );
}

export default PostList;