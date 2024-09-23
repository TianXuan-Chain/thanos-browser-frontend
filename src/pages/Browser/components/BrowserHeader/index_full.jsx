import React, { useState, useEffect } from 'react';
import InputSearchInput from '../InputSearchInput';
import { Row, Col, Menu, Button } from 'antd';
import { history, connect } from 'umi';
const BrowserHeader = ({ dispatch }) => {
  const currentTab =
    history.location.pathname === '/trades'
      ? 'trades'
      : history.location.pathname === '/blocks'
      ? 'blocks'
      : 'home';

  return (
    <Row gutter={24} style={{ marginBottom: '-24px' }} type="flex" justify="space-between">
      <Col xs={24} sm={24} md={12} lg={10} xl={8}>
        <Menu
          onClick={(v) => {
            history.push(v['key']);
          }}
          style={{ borderBottom: 'none' }}
          selectedKeys={[currentTab]}
          mode="horizontal"
        >
          <Menu.Item key="home">首页</Menu.Item>
          <Menu.Item key="blocks">区块</Menu.Item>
          <Menu.Item key="trades">交易</Menu.Item>
        </Menu>
      </Col>
      <Col xs={24} sm={24} md={12} lg={10} xl={8}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {history.location.search !== '' ? (
            <div>
              <Button
                danger
                onClick={() => {
                  history.push(history.location.pathname);
                }}
              >
                清空查询条件
              </Button>
            </div>
          ) : (
            ''
          )}
          <div style={{ display: 'flex', flex: 1, marginLeft: '10px' }}>
            <InputSearchInput
              onSearch={(value, event) => {
                event.preventDefault();
                dispatch({ type: 'browser/globalSearch', payload: { search: value } });
              }}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default connect(({ global, loading }) => ({
  globalState: global,
  loading: loading.global,
}))(BrowserHeader);
