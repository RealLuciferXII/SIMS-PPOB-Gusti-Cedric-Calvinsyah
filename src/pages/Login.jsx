// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";
// import loginIllustration from "../assets/images/imagelogin.png"; // Ganti dengan ilustrasi login yang sesuai
// import logoicon from "../assets/icon/Logosims.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon mata

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [passwordVisible, setPasswordVisible] = useState(false); // State untuk kontrol password visibility
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Login submitted!");
//   };

//   return (
//     <div className="register-page">
//       <div className="form-container">
//         <div
//           style={{ justifyContent: "center" }}
//           className="logo-title-container"
//         >
//           <img src={logoicon} alt="logoicon" className="logo-icon" />
//           <h2>SIMS PPOB</h2>
//         </div>
//         <p>Masukkan akun Anda untuk login</p>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Masukkan Email"
//               className="username-icon"
//             />
//           </div>
//           <div className="form-group password-group">
//             <input
//               type={passwordVisible ? "text" : "password"} // Kondisi untuk tipe input
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Masukkan Password"
//               className="password-icon"
//             />
//             <button
//               type="button"
//               className="eye-icon"
//               onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
//             >
//               {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Ikon mata */}
//             </button>
//           </div>

//           <button type="submit" className="register-button">
//             Login
//           </button>
//         </form>
//         <p className="login-link">
//           Belum punya akun?{" "}
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               navigate("/register");
//             }}
//           >
//             Daftar di sini
//           </a>
//         </p>
//       </div>

//       <div className="illustration-container">
//         <img src={loginIllustration} alt="Login Illustration" />
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import loginIllustration from "../assets/images/imagelogin.png"; 
import logoicon from "../assets/icon/Logosims.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk kontrol password visibility
  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message for validation
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Email tidak valid!");
      return;
    }

    // Validate empty fields
    if (!formData.email || !formData.password) {
      setErrorMessage("Harap isi semua kolom.");
      return;
    }

    setErrorMessage(""); // Clear any previous error
    setLoading(true); // Start loading

    try {
      // Send login request
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Check if login was successful
      if (response.data.status === 0) {
        alert("Login Sukses");
        // Store the token in sessionStorage (or localStorage if persistent login is needed)
        sessionStorage.setItem("authToken", response.data.data.token);
        navigate("/home"); // Redirect to home page
      } else {
        setErrorMessage(response.data.message); // Show message from API
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <div
          style={{ justifyContent: "center" }}
          className="logo-title-container"
        >
          <img src={logoicon} alt="logoicon" className="logo-icon" />
          <h2>SIMS PPOB</h2>
        </div>
        <p>Masukkan akun Anda untuk login</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Masukkan Email"
              className="username-icon"
            />
          </div>
          <div className="form-group password-group">
            <input
              type={passwordVisible ? "text" : "password"} // Kondisi untuk tipe input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Masukkan Password"
              className="password-icon"
            />
            <button
              type="button"
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Ikon mata */}
            </button>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="login-link">
          Belum punya akun?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Daftar di sini
          </a>
        </p>
      </div>

      <div className="illustration-container">
        <img src={loginIllustration} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
