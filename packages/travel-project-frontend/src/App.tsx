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
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/itinerary/:itineraryId"
            element={<ItineraryOverview />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/itinerary" element={<ItineraryOverview />} />
          <Route
            path="/itinerary/:itineraryId/day/:dayId"
            element={<DayView />}
          />
          <Route
            path="/itinerary/:itineraryId/day/:dayId/create-event"
            element={<CreateEvent />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
