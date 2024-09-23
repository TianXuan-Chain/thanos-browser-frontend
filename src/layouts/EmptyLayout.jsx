/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classnames from 'classnames';
import './EmptyLayout.less';

const getPageTitle = (routes, pathname) => {
  const currentRoute = routes.find((route) => route.path === pathname);
  return (currentRoute && currentRoute.title) || '存证核验平台';
};
const EmptyLayout = (props) => {
  const {
    location = {
      pathname: '',
      query: {},
    },
    children,
    route = {
      routes: [],
    },
    dispatch,
  } = props;

  const { routes = [] } = route;
  const title = getPageTitle(routes, location.pathname);

  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    if (dispatch) {
      const { pathname } = history.location;
      setCurrentTab(pathname.indexOf('/evidence') !== -1 ? 0 : 1);
    }
  }, []);
  /**
   * init variables
   */
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container">
        <div className="header"></div>
        <div className="mainWrap">
          <div className="mainContent">{children}</div>
        </div>

        <div className="footer">
          <div className="footerContent">
            
            <div className="footerText">
              <a href="http://gb.corp.163.com/gb/about/overview.html" target="blank">
                公司简介
              </a>
              －
              <a href="https://help.mail.163.com/service.html" target="_blank">
                客户服务
              </a>
              －
              <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">
                网易集团隐私政策及儿童个人信息保护规则
              </a>
              网易公司版权所有
              {/* <p>区块链备案：浙网信备33010821275605010021号</p> */}
            </div>
            <div
              className="brandLogo"
              onClick={() => {
                window.open('https://blockchain.163.com/');
              }}
            />
            {/* <div className="subSlogan" /> */}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(EmptyLayout);
