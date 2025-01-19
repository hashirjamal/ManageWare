import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./Pages/Home"
import Header from "./Components/Header";
import Inventory from "./Pages/Inventory";

function App() {


  return (
    <>
    <Header />
     <Router>
      <Routes>
        
        <Route path ="/" element={<Home />} />
        <Route path ="/inventory" element={<Inventory />} />
        <Route path ="/orders" element={<Home />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
