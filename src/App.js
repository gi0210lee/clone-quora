import React, { useEffect } from 'react';
import './App.css';
import Quora from './pages/Quora';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        // console.log(user)
        dispatch(login({
          uid: user.uid,
          photo: user.photoURL,
          displayName: user.displayName,
          email: user.email
        }))

      } else {
        // User is signed out
        // ...

        dispatch(logout())
      }
    });
  }, [dispatch])

  return (
    <div className="App">
      {user ? <Quora /> : <Login />}
    </div>
  );
}

export default App;
