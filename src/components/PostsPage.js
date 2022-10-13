import React from 'react';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';

function PostsPage({ modalIsOpen, setIsOpen, postToEdite, setPostToEdite }) {
    return (
        <>
        <CreatePostForm />
        <PostList modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} postToEdite={postToEdite} setPostToEdite={setPostToEdite} />
        </>
    );
}

export default PostsPage;