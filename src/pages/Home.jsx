// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userToken = sessionStorage.getItem("authToken");

//     if (!userToken) {
//       navigate("/login");
//     } else {
//       setToken(userToken); 
//     }
//   }, [navigate]);

//   return (
//     <div>
//     <header  className="home-header">
//       <h1>Home Page</h1>
//     </header>
//     <div className="content">
//       {/* Konten halaman utama Anda */}
//     </div>
//   </div>
//   );
// };

// export default Home;


import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <header className="home-header">
        <h1>Home Page</h1>
      </header>
      <div className="content">
       {/* ............ */}
      </div>
    </div>
  );
};

export default Home;
