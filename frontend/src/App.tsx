import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import ResponsiveAppBar from "./components/appBar";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import Login from "./pages/Login";

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
      </Routes>
    </Box>
  );
}

export default App;
