import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoutes from "./components/PublicRoutes";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {" "}
                  <HomePage />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  {" "}
                  <Login />{" "}
                </PublicRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  {" "}
                  <Register />{" "}
                </PublicRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
