import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Index.less';

export default () => {
  return (
    <PageContainer
      title="欢迎来到证据核验"
    >
      <Card>
        我是区块链浏览器
      </Card>
    </PageContainer>
  );
};
