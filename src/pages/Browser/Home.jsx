import { useState, useEffect } from 'react';
import Home from './components/Home';

import BrowserHeader from './components/BrowserHeader';
import HeaderWrapper from './components/HeaderWrapper';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';

const HomePage = ({ location, dispatch }) => {
  return (
    <HeaderWrapper>
      <Home />
    </HeaderWrapper>
  );
};

export default connect(({ global }) => ({
  globalState: global,
  location: history.location,
}))(HomePage);
