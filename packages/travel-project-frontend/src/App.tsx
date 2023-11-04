import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CreateItinerary from './pages/CreateIntinerary/CreateItinerary';

function App() {
  return (
      <BrowserRouter>
          <nav>
              <ul>
                  <li>
                      <Link to="/create-event">Create Event</Link>
                  </li>
              </ul>
          </nav>
        <div>
            <Routes>
                <Route path="/create-event" element={<CreateItinerary />} />
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
