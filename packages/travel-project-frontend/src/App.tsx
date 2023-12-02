import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import CreateItinerary from "./pages/CreateIntinerary/CreateItinerary";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-itinerary" element={<CreateItinerary />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route
            path="/itinerary/:itineraryId"
            element={<ItineraryOverview />}
          />
          <Route path="/day/:dayId" element={<DayView />} />
=======
          <Route path="/login/home" element={<HomePage />} />
          <Route path="/itinerary" element={<ItineraryOverview />} />
          <Route path="/itinerary/day" element={<DayView />} />
>>>>>>> 9bda581 (Added Landing page)
          <Route path="/itinerary/create-event" element={<CreateEvent />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
