import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const withNavbar = (Component, showFooter) => {
  return function WithNavbar({ links, ...props }) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar links={links} />
        <div className="flex-1">
          <Component {...props} />
        </div>
        {showFooter && <Footer />}
      </div>
    );
  };
};

export default withNavbar;
