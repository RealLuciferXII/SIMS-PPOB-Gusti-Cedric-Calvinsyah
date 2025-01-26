// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes, bukan Switch
// import Register from './pages/Register'; // Import halaman registrasi

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Route untuk halaman registrasi */}
//         <Route path="/register" element={<Register />} />
        
//         {/* Route fallback jika tidak ada route lain yang cocok */}
//         <Route path="*" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"; // Import halaman login
import Home from "./pages/Home"; // Tambahkan halaman Home jika sudah ada

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Route halaman login */}
        <Route path="/home" element={<Home />} /> {/* Jika ada halaman home */}
        <Route path="/" element={<Login />} /> {/* Halaman default ke login */}
      </Routes>
    </Router>
  );
};

export default App;

