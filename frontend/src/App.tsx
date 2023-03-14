import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import { ResponsiveAppBar } from "./components/appBar";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import Login from "./pages/Login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignerItem: "center",
      }}
    >
      <ToastContainer />
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:logout" element={<Login />} />
        <Route
          path="/register"
          element={
            <RequireAuth>
              <Register />
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
