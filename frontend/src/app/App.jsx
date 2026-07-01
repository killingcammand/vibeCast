import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";

import Dashboard from "../features/auth/pages/Dashboard.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Navbar from "../commonComponents/Navbar.jsx";

import HomePage from "../features/videos/pages/HomePage.jsx";
import UploadPage from "../features/videos/pages/UploadPage.jsx";
import VideoPlayerPage from "../features/videos/pages/VideoPlayerPage.jsx";
import NotificationPage from "../features/notifications/pages/notificationPage.pages.jsx";
export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        // Public Routes 
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:videoID" element={<VideoPlayerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        // Protected Routes
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}