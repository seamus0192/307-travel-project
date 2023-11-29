import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import CreateItinerary from "./pages/CreateIntinerary/CreateItinerary";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import ItineraryOverview from "./pages/ItineraryOverview/ItineraryOverview";
import DayView from "./pages/DayView/DayView";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Signup from "./pages/SignUp/SignUp";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { setAuthToken } from "./httpClient/axiosConfig";

function App(): JSX.Element {
  setAuthToken();
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-itinerary" element={<CreateItinerary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/itinerary" element={<ItineraryOverview />} />
          <Route path="/itinerary/day" element={<DayView />} />
          <Route path="/itinerary/create-event" element={<CreateEvent />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
