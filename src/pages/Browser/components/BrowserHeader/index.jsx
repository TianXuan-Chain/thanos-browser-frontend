import React, { useState, useEffect } from 'react';
import InputSearchInput from '../InputSearchInput';
import { Row, Col, Menu } from 'antd';
import { HomeOutlined, TransactionOutlined, BranchesOutlined } from '@ant-design/icons';
import logo from '@/assets/logo.png';
import styles from './index.less';
import { connect, Link, withRouter } from 'umi';
const BrowserHeader = ({ location, dispatch }) => {
  const [detailType, setDetailType] = useState('');
  const [hash, setHash] = useState('');
  useEffect(() => {
    if (location.query) {
      const { detailType, hash } = location.query;
      setDetailType(detailType);
      setHash(hash);
    }
  }, [location.query]);

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <div>
          <div className={styles.title}>
              <img src={logo} alt="logo" />
          </div>
        </div>
        <div className={styles.menus}>
          <div className={styles.nav}>
            <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="light">
              <Menu.Item key="/home">
                <Link to="/home">
                  <HomeOutlined />
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key={detailType === 'trade' ? '/detail' : '/trades'}>
                <Link
                  to={
                    detailType === 'trade'
                      ? `/detail?detailType=${detailType}&hash=${hash}`
                      : '/trades'
                  }
                >
                  <TransactionOutlined />
                  交易
                </Link>
              </Menu.Item>
              <Menu.Item key={detailType === 'blocks' ? '/detail' : '/blocks'}>
                <Link
                  to={
                    detailType === 'blocks'
                      ? `/detail?detailType=${detailType}&hash=${hash}`
                      : '/blocks'
                  }
                >
                  <BranchesOutlined />
                  区块
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className={styles.searchContent}>
            <div style={{ display: 'flex', flex: 1}}>
              <InputSearchInput

                onSearch={(value) => {
                  dispatch({
                    type: 'browser/queryGlobalSearch',
                    payload: { search: value, pageSize: 20 },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default connect(({ global }) => ({
  currentChainInfo: global.currentChainInfo,
}))(withRouter(BrowserHeader));
