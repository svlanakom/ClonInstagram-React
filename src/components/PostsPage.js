import React, { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';

function PostsPage({ modalIsOpen, setIsOpen, postToEdite, setPostToEdite }) {
    const [posts, setPosts] = useState([]);

    return (
        <>
        <CreatePostForm
            posts={posts}
            setPosts={setPosts}
        />
        <PostList
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            postToEdite={postToEdite}
            setPostToEdite={setPostToEdite}
            posts={posts}
            setPosts={setPosts}
        />
        </>
    );
}

export default PostsPage;