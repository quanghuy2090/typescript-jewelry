import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return <Link to={'/login'} onClick={handleLogout}>Logout</Link>;
};
export default Logout;
