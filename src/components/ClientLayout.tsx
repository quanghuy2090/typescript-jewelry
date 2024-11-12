import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ClientLayout = () => {
  return (
    <>
      <div className="client_layout">
        <Header />
        {/* <div className="container"> */}
        <Outlet />
        {/* </div> */}
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
