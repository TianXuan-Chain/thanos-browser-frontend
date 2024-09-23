import React from 'react';
import BlockList from './components/BlockList';
import HeaderWrapper from './components/HeaderWrapper';

import { connect } from 'umi';

const HomePage = () => {
  return (
    <HeaderWrapper>
      <BlockList />
    </HeaderWrapper>
  );
};

export default connect(({ global }) => ({
  globalState: global,
}))(HomePage);
