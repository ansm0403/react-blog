import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate, Link} from "react-router-dom"

function App() {
  return (
    <>
      <div>
        <Link to ='/'>Home</Link>
        <Link to ='/posts'>post</Link>
      </div>
      <Routes>
        <Route path = '/' element={<h1>Home</h1>} />
        <Route path = '/posts' element={<h1>post</h1>} />
        <Route path = '/posts/:id' element={<h1>post</h1>} />
        <Route path = '/posts/new' element={<h1>post</h1>} />
        <Route path = '/posts/edit/:id' element={<h1>post</h1>} />
        <Route path = '/profile' element={<h1>post</h1>} />
        <Route path = '*' element={<Navigate replace to = "/" />} />
      </Routes>
    </>
  );
}

export default App;
