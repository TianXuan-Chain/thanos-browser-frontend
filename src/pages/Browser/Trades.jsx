import React from 'react';

import TradeList from './components/TradeList';

import { connect } from 'umi';
import HeaderWrapper from './components/HeaderWrapper';

const HomePage = ({ dispatch }) => {
  return (
    <HeaderWrapper>
      <TradeList />
    </HeaderWrapper>
  );
};

export default connect(({ global }) => ({
  globalState: global,
}))(HomePage);
