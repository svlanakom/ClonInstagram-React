import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PostList({ modalIsOpen, setIsOpen, postToEdite, setPostToEdite }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3003/posts`, {
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
                            <Card.Img variant="top" src={`http://127.0.0.1:3003/${post.imagePath}`} alt={post.title} />
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



                            </Card.Body>
                        </Card>
                    </Col>)}

            </Row>
        </>
    );
}

export default PostList;