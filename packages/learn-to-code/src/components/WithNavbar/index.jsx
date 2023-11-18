import React from 'react';
import Navbar from '../Navbar';

const withNavbar = (Component) => {
  return function WithNavbar({ links, ...props }) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar links={links} />
        <div className="flex-1 overflow-y-auto p-4">
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withNavbar;
