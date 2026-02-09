import React, {Fragment, useEffect, useState} from "react";

import {toast} from "react-toastify";
import {PulseLoader} from "react-spinners";
import {data, useNavigate} from "react-router-dom";
import useAuth from "../hook/useAuth";

function Login() {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const {loginUser, isLoading} = useAuth();
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, []);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e;

    return setPayload((prev) => {
      return {...prev, [name]: value};
    });
  };
  const handleLogin = async (e) => {
  e.preventDefault();
  
  if (payload.email.length === 0 || payload.password.length === 0) {
    setError(true);
    return;
  }

  const data ={
    email:payload?.email,
    password:payload?.password
  }

  await loginUser(formData, {
    headers: {
      'company_id': "01k0bd1gyjptcmwrnyg128vgar",
      'Accept': 'application/json'
    },
    onSuccess: (response) => {
      // Store the access_token
      localStorage.setItem('access_token', response.access_token);
      toast.success("Welcome Admin!");
      window.location.href = "/";
    },
    onFailed: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
};

  return (
    <div>
      <Fragment>
        <div className="">
          <div
            className="page-loader-wrapper"
            style={{display: isLoad ? "block" : "none"}}
          ></div>
          <div className="login-page">
            <video className="login-video-bg" autoPlay loop muted playsInline>
              <source
                src={require("../Assets/login.mp4")}
                type="video/mp4"
              />
            </video>
            <div className="login-bg-overlay">
              <div className="login-wrapper">
                <div className="auth-box custom-auth-box">
                  {/* LOGO */}
                  <div className="login-logo">LOGO</div>

                  <div className="custom-login-card">
                    <div className="header text-center">
                      <h3>Sign in</h3>
                      <p>Login to manage your account</p>
                    </div>

                    <form onSubmit={(e) => handleLogin(e)}>
                      <div className="body">
                        <div className="form-auth-small">
                          <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                              className="form-control custom-input"
                              placeholder="Enter your email"
                              type="email"
                              name="email"
                              value={payload.email}
                              onChange={(e) => handleChange(e.target)}
                            />
                            {error && payload.email.length === 0 && (
                              <span className="error_">Email is Required!</span>
                            )}
                          </div>

                          <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                              className="form-control custom-input"
                              placeholder="Enter your password"
                              type="password"
                              name="password"
                              value={payload.password}
                              onChange={(e) => handleChange(e.target)}
                            />
                            {error && payload.password.length === 0 && (
                              <span className="error_">
                                Password is Required!
                              </span>
                            )}
                          </div>

                          <div className="login-options">
                            <label className="remember-me">
                              <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                  setRememberMe(e.target.checked)
                                }
                              />
                              Remember me
                            </label>

                            <a href="#" className="forgot-link">
                              Forgot password?
                            </a>
                          </div>

                          {payload.password.length !== 0 &&
                            payload.email.length !== 0 && (
                              <button className="btn login-btn" type="submit">
                                {isLoading ? (
                                  <PulseLoader color="#fff" size={8} />
                                ) : (
                                  "Login"
                                )}
                              </button>
                            )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default Login;