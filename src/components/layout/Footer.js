import React from 'react';
import { GlobalStyle } from '../../constants/common';

const Footer = () => {
  return (
    <>
      <footer>
        <a href="#">
          Powered by
          <img src="/getacar.svg" alt="Get A Car" className="logo" />
          {" Get A Car "}
        </a>
      </footer>
      <GlobalStyle />
    </>
  );
};

export default Footer;
