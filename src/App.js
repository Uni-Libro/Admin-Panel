import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Table from "./Table"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

