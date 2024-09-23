import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { connect, Link, withRouter } from 'umi';
import moment from 'moment';

function formatTime(time) {
  return moment(parseInt(time, 10)).format('YYYY-MM-DD HH:mm:ss');
}
const columns = [
  {
    title: '块高',
    dataIndex: 'number',
    align: 'left',
    render: (text, record) => (
      <Link to={`/detail?detailType=blocks&hash=${record.pkHash}`}>{text}</Link>
    ),
  },
  {
    title: '生成时间',
    dataIndex: 'timestamp',
    align: 'left',
    render: (text) => <span>{formatTime(text)}</span>,
  },
  {
    title: '交易数量',
    dataIndex: 'evmTnxNum',
    width: 100,
    align: 'left',
    render: (text) => <span className={styles.quantity}>{text}</span>,
  },
  {
    title: '哈希',
    dataIndex: 'pkHash',
    align: 'left',
    render: (text) => <span className={styles.hash}>{text}</span>,
  },
];

const BlockList = ({ location, blocksInfo, dispatch, loading }) => {
  const { form, searchValue } = location.query;
  const { list, total } = blocksInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  

  useEffect(() => {
    if (form === 'search') {
      dispatch({
        type: 'browser/queryGlobalSearch',
        payload: { search: searchValue, pageSize: pageSize, page: currentPage },
      });
    } else {
      dispatch({
        type: 'browser/queryBlocksList',
        payload: { page: currentPage, pageSize: pageSize },
      });
    }
  }, [currentPage,pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.shadows}>
        <Table
          rowKey="pkHash"
          className={styles.tableStyle}
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            showSizeChanger: true,
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: (page, size) => {
              setPageSize(size);
              if (size !== pageSize) {
                setCurrentPage(1);
              } else {
                setCurrentPage(page);
              }
            },
          }}
        />
      </div>
    </div>
  );
};
export default connect(({ browser, loading }) => ({
  blocksInfo: browser.blocksInfo,
  loading: loading.effects['browser/queryBlocksList'],
}))(withRouter(BlockList));
