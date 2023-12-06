import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
// import Footer from "./components/Footer/Footer";
import { authContext, AuthProvider } from "./authContext/authContext";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <UnauthorizedHandler>
                <LandingPage />
              </UnauthorizedHandler>
            }
          />
          <Route
            path="/login"
            element={
              <UnauthorizedHandler>
                <Login />
              </UnauthorizedHandler>
            }
          />
          <Route
            path="/signup"
            element={
              <UnauthorizedHandler>
                <Signup />
              </UnauthorizedHandler>
            }
          />
          <Route
            path="/home"
            element={
              <AuthorizedHandler>
                <HomePage />
              </AuthorizedHandler>
            }
          />
          <Route
            path="/itinerary/:itineraryId"
            element={
              <AuthorizedHandler>
                <ItineraryOverview />
              </AuthorizedHandler>
            }
          />
          <Route
            path="/create-itinerary"
            element={
              <AuthorizedHandler>
                <CreateItinerary />
              </AuthorizedHandler>
            }
          />
          <Route
            path="/itinerary/:itineraryId/day/:dayId"
            element={
              <AuthorizedHandler>
                <DayView />
              </AuthorizedHandler>
            }
          />
          <Route
            path="/itinerary/:itineraryId/day/:dayId/create-event"
            element={
              <AuthorizedHandler>
                <CreateEvent />
              </AuthorizedHandler>
            }
          />
        </Routes>
      </AuthProvider>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

function AuthorizedHandler({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { user } = useContext(authContext);

  if (user === null) {
    return <Navigate to={"/"} />;
  }
  return children;
}

function UnauthorizedHandler({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { user } = useContext(authContext);

  if (user !== null) {
    return <Navigate to={"/home"} />;
  }
  return children;
}

export default App;
