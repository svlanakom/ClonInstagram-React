import React, { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';

import { useAuthState } from '../context';

function PostsPage({ modalIsOpen, setIsOpen, postToEdite, setPostToEdite }) {
    const [posts, setPosts] = useState([]);
    const authState = useAuthState();

    return (
        <>
            {
                authState.token ?
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
                    :
                    <h3 className="d-flex justify-content-center mt-5">Posts is not avaliable</h3>
            }
        </>
    );
}

export default PostsPage;