import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from './components/Map';
import AddPost from "./components/AddPost";
import ChatPanel from "./components/Chat";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Chattest from './components/Chattest';

function App() {

  const [points, setPoints] = useState([])


  return (
    <>
      <Router>
        <Routes>
          <Route path='/post' exact element={<AddPost setPoints={setPoints} />} />
          <Route path='/map' exact element={<Map points={points}/>} />
          <Route path='/chat' exact element={<ChatPanel/>} />
          <Route path='/SignUp' exact element={<SignUp/>} />
          <Route path='/SignIn' exact element={<SignIn/>} />
          <Route path='/chat2' exact element={<Chattest/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;