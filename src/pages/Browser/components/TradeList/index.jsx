import { useState, useEffect } from 'react';
import { Table } from 'antd';

import { connect, Link, withRouter } from 'umi';
import moment from 'moment';
import styles from './index.less';

function formatTime(time) {
  return moment(parseInt(time, 10)).format('YYYY-MM-DD HH:mm:ss');
}

const columns = (dispatch) => {
  return [
    {
      title: '哈希',
      dataIndex: 'pkHash',
      render: (text, record) => (
        <Link
          className={styles.hash}
          to={`/detail?detailType=trade&hash=${record.pkHash}&blockTimestamp=${record.blockTimestamp}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: '所属块',
      dataIndex: 'blockNumber',
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: '交易时间',
      dataIndex: 'blockTimestamp',
      render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{formatTime(text)}</span>,
    },
    {
      title: '发送者',
      dataIndex: 'transactionFrom',
      render: (text, record) => (
        <span
          className={styles.hash}
          onClick={() => {
            dispatch({
              type: 'browser/queryGlobalSearch',
              payload: { search: record.transactionFrom, pageSize: 20, page: 1 },
            });
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: '接收者',
      dataIndex: 'contractAddress',
      render: (text, record) => (
        <span
          className={styles.hash}
          onClick={() => {
            dispatch({
              type: 'browser/queryGlobalSearch',
              payload: { search: record.contractAddress, pageSize: 20, page: 1 },
            });
          }}
        >
          {text}
        </span>
      ),
    },
  ];
};

const TradeList = ({ location, transactionsInfo, dispatch, loading }) => {
  const { form, searchValue } = location.query;
  const { list, total } = transactionsInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);


  useEffect(() => {
    if (form === 'search') {
      dispatch({
        type: 'browser/queryGlobalSearch',
        payload: { search: searchValue, pageSize, page: currentPage },
      });
    } else {
      dispatch({
        type: 'browser/queryTradeList',
        payload: { page: currentPage, pageSize },
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
          columns={columns(dispatch)}
          dataSource={list}
          pagination={{
            pageSizeOptions:[10,20,50],
            showSizeChanger: true,
            current: currentPage,
            pageSize,
            total,
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
  transactionsInfo: browser.transactionsInfo,
  loading: loading.effects['browser/queryTradeList'],
}))(withRouter(TradeList));
