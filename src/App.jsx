import { useContext } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {currentUser} = useContext(UserContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/">
          
        </Route> */}
        <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
