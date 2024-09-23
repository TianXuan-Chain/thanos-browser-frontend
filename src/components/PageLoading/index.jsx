import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
import React from 'react';
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
const Loading = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PageLoading />
    </div>
  );
};
export default Loading;
