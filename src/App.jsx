import React, { Children, useEffect, useState } from "react";
import { Button } from "./components/ui/button"; // Assuming you have this button component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { useAppStore } from "./stores";
import apiClient from "./lib/api-client";

const RouteGuard = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = Boolean(userInfo);

  if (window.location.pathname === "/auth" && isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  if (window.location.pathname !== "/auth" && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
        setUserInfo(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <RouteGuard>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </Routes>
            </RouteGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
