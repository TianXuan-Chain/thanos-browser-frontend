import { useState, useEffect } from 'react';
import { Table } from 'antd';

import { connect, Link, withRouter } from 'umi';
import moment from 'moment';
import styles from './index.less';

function formatTime(time) {
  return moment(parseInt(time, 10)).format('YYYY-MM-DD HH:mm:ss');
}

const columns = [
  

  {
    title: '交易时间',
    dataIndex: 'blockTimestamp',
    render: (text) => <span style={{ whiteSpace: 'nowrap' }}>{formatTime(text)}</span>,
  },

  {
    title: '交易状态',
    dataIndex: 'tradeStat',
    render: (text) => ['失败', '成功'][text],
  },

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
];

const TradeListForContract = ({ location,contractAddress, transactionsInfo, dispatch }) => {
  const  searchValue  = location.query.hash;
  const { list, total } = transactionsInfo;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (contractAddress) {
      dispatch({
        type: 'browser/queryTradeList',
        payload: {
          contractAddress,
          page: currentPage,
          pageSize,
        },
      });
    }
  }, [currentPage, pageSize, contractAddress]);
  return (
    <div className={styles.container}>
      <div>
        <Table
          rowKey="pkHash"
          className={styles.tableStyle}
          columns={columns}
          dataSource={list}
          pagination={{
            pageSizeOptions: [10, 20, 50],
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
}))(withRouter(TradeListForContract));


