import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './components/Router';
import {app, db} from "firebaseApp";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Loader from 'components/Loader';

function App() {
  
  const auth = getAuth(app);
  // auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  // auth를 체크하기 전(initialize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    })
  },[auth])
  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated = {isAuthenticated}/> : <Loader />}
      {/* <Router isAuthenticated = {isAuthenticated}/> */}
    </>
  );
}

export default App;
