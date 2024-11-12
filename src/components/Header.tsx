import { Link } from "react-router-dom";
import { openNav } from "../ui/custom";
import { useEffect, useState } from "react";
import Logout from "./Logout";

const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserToken();
  }, []);
  const getUserToken = () => {
    const getUser = localStorage.getItem("user") || null;
    const user = JSON.parse(getUser!);
    setUser(user);
  };
  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="/">
            <span>Jewelry</span>
          </a>
          <div>
            <div className="custom_menu-btn">
              <button onClick={openNav}>
                <span className="s-1"> </span>
                <span className="s-2"> </span>
                <span className="s-3"> </span>
              </button>
              <div id="myNav" className="overlay">
                <div className="overlay-content">
                  <Link to="/">Home</Link>
                  <Link to="/admin">Admin</Link>
                  {user ? (
                    <div>
                      <Logout/>
                    </div>
                  ):(
                    <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </div>
                  )
                    
                  }
                  <Link to="/cart">Cart</Link>
                  <Link to="/order">Order</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
