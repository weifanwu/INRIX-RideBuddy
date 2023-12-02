import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from './components/Map';
import AddPost from "./components/AddPost";
import ChatPanel from "./components/Chat";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {

  const [directionsResponse, setDirectionsResponse] = useState(null)


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<AddPost setDirections={setDirectionsResponse} />} />
          <Route path='/map' exact element={<Map directions={directionsResponse}/>} />
          <Route path='/chat' exact element={<ChatPanel/>} />
          <Route path='/SignUp' exact element={<SignUp/>} />
          <Route path='/SignIn' exact element={<SignIn/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;