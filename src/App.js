import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Users from "./Users";
import Authors from "./Authors";
import Books from "./Books";
import Vouchers from "./Vouchers";
import { validateToken as validateTokenAPI } from "./service/auth";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedin = () => Boolean(localStorage.getItem("token"));
  const validateToken = async () => {
    try {
      await validateTokenAPI();
    } catch (err) {
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedin() ? <Users /> : <Auth />} />

        <Route path="/users" element={isLoggedin() ? <Users /> : <Auth />} />
        <Route
          path="/authors"
          element={isLoggedin() ? <Authors /> : <Auth />}
        />
        <Route path="/books" element={isLoggedin() ? <Books /> : <Auth />} />
        <Route
          path="/vouchers"
          element={isLoggedin() ? <Vouchers /> : <Auth />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
