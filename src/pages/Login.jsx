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

  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Email tidak valid!");
      return;
    }

    if (!formData.email || !formData.password) {
      setErrorMessage("Harap isi semua kolom.");
      return;
    }

    setErrorMessage(""); 
    setLoading(true); 

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.status === 0) {
        alert("Login Sukses");
        sessionStorage.setItem("authToken", response.data.data.token);
        navigate("/home");
      } else {
        setErrorMessage(response.data.message); 
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false); 
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
              type={passwordVisible ? "text" : "password"}
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
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
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
