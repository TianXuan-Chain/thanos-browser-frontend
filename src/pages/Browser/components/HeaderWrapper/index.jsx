import React from 'react';
import BrowserHeader from '../BrowserHeader/index';
import './index.less';

const HeaderWrapper = (props) => {
  return (
    <>
      <BrowserHeader />
      <div className="mainWrapper">{props.children}</div>
    </>
  );
};

export default HeaderWrapper;
