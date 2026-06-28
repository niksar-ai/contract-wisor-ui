import React from 'react';
import * as AppUrlConstant from '../../constants/app_url';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = AppUrlConstant.LOGIN_PAGE_URL;
  }
  return (
    <header className="header">
      <i className="fa-regular fa-sun mx-2"></i>
      <i className="fa-solid fa-bell mx-2"></i>
      <i className="fa-solid fa-arrow-right-from-bracket mx-2" onClick={handleLogout}></i>
      <img className="rounded-circle m-2 " src="/assets/images/avatar/avatar-1.png" alt="" height="40"></img>
    </header>
  );
};

export default Header;
