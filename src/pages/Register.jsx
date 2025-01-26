import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearState } from "../slice/registrationSlice"; 
import { useNavigate } from "react-router-dom";
import "./Register.css";
import registerIllustration from "../assets/images/imagelogin.png";
import logoicon from "../assets/icon/Logosims.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.registration); 

  useEffect(() => {
    if (success) {
      alert(success); 
      dispatch(clearState());
      navigate("/login");
    }

    if (error) {
      alert(error); 
      dispatch(clearState()); 
    }
  }, [success, error, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    const { email, first_name, last_name, password } = formData;
    dispatch(registerUser({ email, first_name, last_name, password }));
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
        <p>Lengkapi data untuk membuat akun</p>
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
          <div className="form-group">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Masukkan Nama Depan"
              className="name1-icon"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Masukkan Nama Belakang"
              className="name1-icon"
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
          <div className="form-group password-group">
            <input
              type={confirmPasswordVisible ? "text" : "password"} 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Konfirmasi Password"
              className="password-icon"
            />
            <button
              type="button"
              className="eye-icon"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Loading..." : "Registrasi"}
          </button>
        </form>
        <p className="login-link">
          Sudah punya akun?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Login di sini
          </a>
        </p>
      </div>

      <div className="illustration-container">
        <img src={registerIllustration} alt="Register Illustration" />
      </div>
    </div>
  );
};

export default Register;
