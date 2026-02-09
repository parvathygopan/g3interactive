import React, {useEffect, useRef, useState} from "react";
import "./Homestyle.css";
import Hamburger from "hamburger-react";
import Logo from "../../Assets/logo-home.png";
import * as Md from "react-icons/md";
import * as Fi from "react-icons/fi";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BiShoppingBag} from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";

function Header() {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const location = useLocation();
  const [isUrl, setIsUrl] = useState(null);
  const [click, setClick] = useState(false);
  const [navbar, setNavbar] = useState(false);


  useEffect(() => {
    setIsUrl(location.pathname);
  }, [location]);
  const handleClick = () => {
    setClick(!click);
  
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {

      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className={navbar ? "mx-auto     head-main scrolled" : "head-main"}>
        <div className="container-fluid d-flex">
          <div className="logo_area">
            <a href="/">
              <img src={Logo} className="logo-img" />
            </a>
          </div>
          {click ? (
            <>
              <nav>
                <ul className={click ? "nav_items active" : "nav_items"}>
                  <li>
                    <Link
                      exact={true}
                      to="/"
                      className={
                        "nav_links" + (isUrl === "/" ? " selected" : "")
                      }
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link exact={true} to="/" className="nav_links">
                        Category<SlArrowDown size={10} className="dom-ic"/>
                    </Link>
                  </li>
                  <li>
                    <Link
                      exact={true}
                      to="/contact"
                      className={
                        "nav_links" + (isUrl === "/" ? " selected" : "")
                      }
                    >
                      Contact{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      exact={true}
                      to="/about"
                      className={
                        "nav_links" + (isUrl === "/" ? " selected" : "")
                      }
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <nav>
                <ul className={click ? "nav_items2 active" : "nav_items2"}>
                  <li>
                    <Link
                      exact={true}
                      to="/"
                      className={
                        "nav_links2" + (isUrl === "/" ? " selected" : "")
                      }
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link exact={true} to="/" className="nav_links2">
                      Category<SlArrowDown size={10} className="dom-ic"/>
                    </Link>
                  </li>

                  <li>
                    <Link
                      exact={true}
                      to="/contact"
                      className={
                        "nav_links2" + (isUrl === "/" ? " selected" : "")
                      }
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      exact={true}
                      to="/about"
                      className={
                        "nav_links2" + (isUrl === "/" ? " selected" : "")
                      }
                    >
                      Contact
                    </Link>
                  </li>
                  {/* <li>
                    <div className="icon-wrapper">
                     <div className="p-1">
                       <BiShoppingBag />
                     </div>
                      <span className="badge">2</span>
                    </div>
                  </li> */}
                  <li>
  <div className="cart-icon-wrapper">
    <BiShoppingBag className="icon" />
    <span className="badge">2</span>
  </div>
</li>

                </ul>
              </nav>
            </>
          )}
          <div className="auth-links">
            <>
              <a
                href="/login"
                className="login-btn"
                style={{cursor: "pointer", userSelect: "none"}}
              >
                Login
              </a>
            </>
          </div>
          <div className="nav-icon" onClick={handleClick}>
            <Hamburger />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
