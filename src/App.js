import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Users from "./Users"
import Authers from "./Authers"
import Books from "./Books"
import Vouchers from "./Vouchers"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/users" element={<Users />} />
        <Route path="/authers" element={<Authers />} />
        <Route path="/books" element={<Books />} />
        <Route path="/vouchers" element={<Vouchers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

