import React, { useEffect, useState } from "react";
import { Container, CloseButton } from "react-bootstrap";
import ReactModal from "react-modal";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Navigation from "./Navigation";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import EditeForm from "./EditeForm";
import UserList from "./UserList";
import PostsPage from "./PostsPage";
import EditePostForm from "./EditePostForm";
import axios from "axios";
import { useAuthDispatch } from '../context';

import {port} from '../config';

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userToEdite, setUserToEdite] = useState({});
  const [postToEdite, setPostToEdite] = useState({});
  const navigate = useNavigate();

  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.email && data.token) {
      axios.get(`${port}/users/get/${data.email}`, {
        headers: {
          'Authorization': data.token
        }
      }).then(response => {
        if (Object.keys(response.data).length > 0)
          authDispatch({ type: 'LOGIN', payload: data });
      });
    }
  }, [authDispatch]);

  // function afterOpenModal() {
  // }

  function afterCloseModal() {
    navigate(-1);
  }

  function requestCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Navigation modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <Container style={{ marginTop: 5 }}>
        <Routes>
          <Route path='/' element={<UserList modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} userToEdite={userToEdite} setUserToEdite={setUserToEdite} />} />
          <Route path='/about' element={<div>About page</div>} />
          <Route path='/contact' element={<div>Contact page</div>} />
          <Route path='/posts' element={<PostsPage modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} postToEdite={postToEdite} setPostToEdite={setPostToEdite} />} />
        </Routes>
        <ReactModal
          style={{ width: '50%' }}
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onAfterClose={afterCloseModal}
          onRequestClose={requestCloseModal}
          ariaHideApp={false}
        >
          <CloseButton onClick={() => setIsOpen(false)} />
          <Routes>
            <Route path='/login' element={<LoginForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />} />
            <Route path='/registration' element={<RegistrationForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />} />
            <Route path='/edite' element={<EditeForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} userToEdite={userToEdite} setUserToEdite={setUserToEdite} />} />
            <Route path='/editepost' element={<EditePostForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} postToEdite={postToEdite} setPostToEdite={setPostToEdite} />} />
          </Routes>
        </ReactModal>
      </Container>
    </>
  );
}

export default App;
