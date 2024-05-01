import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate, Link} from "react-router-dom"
import Router from './components/Router';
import {app} from "firebaseApp";
import { getAuth } from 'firebase/auth';

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  return (
    <>
      <Router isAuthenticated = {isAuthenticated}/>
    </>
  );
}

export default App;
