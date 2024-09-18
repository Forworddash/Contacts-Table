import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import ContactList from './components/contactlist';
import ContactDetail from './components/contactdetails';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:name" element={<ContactDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
