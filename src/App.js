import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './layouts/navBar';
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  }
  const userState = () => {
    const data = localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  }

  useEffect(() => {
    userState();
  }, []);
  
  return (
    <>
      {user !== null ? (
        <>
          <NavBar/>
        </>
      ) : (
        <>
        {toggleForm ? (<Login loggedIn = {(user) => setUser(user)}
         toggle={() => formMode()}/>) : (<Register toggle={() => formMode()}/>)}
       </>
      )}
    </>
    
  );
}

export default App;
