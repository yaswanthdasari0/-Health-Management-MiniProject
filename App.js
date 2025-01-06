import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import SubmittedData from './components/SubmittedData'; // Create a new SubmittedData component
import Progress from './components/Progress';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/submitted-data/:userId" element={<SubmittedData />} />
        <Route path="/progress/:userId" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;
