import { Link, connect, history } from 'umi';
import { Chart, Tooltip, Axis, SmoothLine, Point, Area, Coord, Legend, Guide } from 'viser-react';
import moment from 'moment';

import { Card, Row, Col, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { BranchesOutlined, TransactionOutlined } from '@ant-design/icons';

const txnScale = [
  {
    dataKey: 'Transactions',
    min: 0,
    tickCount: 6,
    formatter: (value) => value/1000 + ' k',
    // formatter: (value) => value,
    alias: '当日交易量',
  },
];

const blockScale = [
  {
    dataKey: 'bckn',
    min: 0,
    tickCount: 6,
    alias: '当日块高',
  },
];

function formatTime(time) {
  return moment(parseInt(time, 10)).format('YYYY-MM-DD HH:mm:ss');
}

const NetworkStatus = {
  0: '异常',
  1: '正常',
  '-1': '',
};

const blockTabList = [
  {
    key: 'txn',
    tab: '交易量走势',
  },
];

const BlockList = (prop) => {
  const { blockList } = prop;
  return blockList.map((item) => (
    <Link to={`/detail?detailType=blocks&hash=${item.pkHash}`} key={item.pkHash}>
      <li className={styles.listItem}>
        <div className={styles['list-left']}>
          <div>区块 {item.number}</div>
        </div>
        <div className={styles['list-right']}>
          <div className={styles.list_desc}>
            <p>
              <span>tx哈希值：</span>
              <span className={styles.hash}>{item.pkHash}</span>
            </p>
            <p>
              <span>交易数量：</span>
              <span className={styles.hash}>{item.evmTnxNum}</span>
            </p>
            <p>
              <span>出块时间：</span> {formatTime(item.timestamp)}
            </p>
          </div>
        </div>
      </li>
    </Link>
  ));
};

const TradeList = (prop) => {
  const { tradeList } = prop;

  return tradeList.map((item) => (
    <li className={`${styles.listItem} ${styles.transaction}`} key={item.pkHash}>
      <div className={styles.transaction_left}>
        <p>
          <span>tx哈希值：</span>
          <Link
            className={styles.hash}
            to={`/detail?detailType=trade&hash=${item.pkHash}&blockTimestamp=${item.blockTimestamp}`}
          >
            {item.pkHash}
          </Link>
        </p>
        <p>
          From：{' '}
          <Link
            to={`/detail?detailType=trade&hash=${item.pkHash}&blockTimestamp=${item.blockTimestamp}`}
            className={styles.address}
          >
            {item.transactionFrom}
          </Link>{' '}

        </p>
        <p>{item.transactionTo ? (
            <span>
              To：
              <Link
                to={`/detail?detailType=trade&hash=${item.pkHash}&blockTimestamp=${item.blockTimestamp}`}
                className={styles.address}
              >
                {item.transactionTo}
              </Link>
            </span>
          ) : (
            '-'
          )}
        </p>
      </div>
      <div className={styles.timestamp}>
        <div>{formatTime(item.blockTimestamp)}</div>
      </div>
    </li>
  ));
};

const IndexPage = ({
  dispatch,
  loading1,
  loading2,
  loading3,
  loading4,

  blockChainInfo,
  txnCountList,
  homeNewBlockList,
  homeTransactionsList,
}) => {
  const { lastBlockNum, txnCount, epoch, activeNodes, totalNodes } = blockChainInfo;

  useEffect(() => {
    dispatch({
      type: 'browser/queryBlockChain',
    });

    dispatch({
      type: 'browser/queryTxnCount',
      payload: { size: 14 },
    });

    dispatch({
      type: 'browser/queryBlocks',
      payload: { startNumber: null, pageSize: 5 },
    });

    dispatch({
      type: 'browser/queryTransactions',
      payload: { startId: null, pageSize: 5 },
    });
  }, []);



  const [tabKey, setTabKey] = useState('txn');

  const blockTabChange = (key) => {
    setTabKey(key);
  };

  return (
    <div className={styles.pageHome}>
      {/* {notice[0]} */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12}>
          <Card title="天玄链信息概览" loading={loading1} style={{ height: 268 }}>
            <Row xs={24} sm={24} md={12}  gutter={0} align="middle">
              <Col span={12} style={{ marginBottom: 0,display:'flex',justifyContent:'flex-start' }}>
                <Statistic title="当前块高" value={lastBlockNum} />
              </Col>
              <Col span={12} style={{ marginBottom: 0 }}>
                <Statistic title="交易总量" value={txnCount} />
              </Col>
              <Col span={12}>
                <Statistic title="当前epoch" value={epoch} />
              </Col>
              {/* <Col span={12}>
                <Statistic title="PBFT当前视图" value={epoch} />
              </Col> */}
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card
            title="最近14天交易走势"
            loading={loading2}
            style={{ height: 268 }}
            bodyStyle={{paddingTop:24,paddingBottom:24}}
          >
            <Chart
              forceFit
              pixelRatio
              height={160}
              scale={txnScale}
              padding={[10, 10, 45, 52]} //上 右 下 左
              data={txnCountList}
            >
              <Tooltip />
              <Axis label={{density:0.5, formatter:(v)=>v}}/>
              <SmoothLine position="dataStr*Transactions" color="#214790" />
              <Point position="dataStr*Transactions" shape="circle" color="#214790" size={3.5}/>
              <Area tooltip={false} position="dataStr*Transactions" shape="smooth" color='l(90) 0:rgba(0, 102, 255, 0.4) 1:rgba(0, 102, 255, 0)'></Area>
            </Chart>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="区块"
            loading={loading3}
            extra={
              <>
              <div className={styles.headerIcon}><BranchesOutlined/></div>
              <Link className={styles.iconMore} to="/blocks">
                更多
              </Link>
              </>
            }
            style={{
              width: '100%',
            }}
            className={styles.list}
          >
            <ul style={{ padding: 0,margin:'-16px -32px'}}>
              <BlockList blockList={homeNewBlockList} />
            </ul>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="交易"
            loading={loading4}
            extra={
              <>
              <div className={styles.headerIcon}><TransactionOutlined/></div>

              <Link className={styles.iconMore} to="/trades">
                更多
              </Link>
              </>
            }
            style={{
              width: '100%',
            }}
            className={styles.list}
          >
            <ul style={{ padding: 0,margin:'-16px -32px' }}>
              <TradeList tradeList={homeTransactionsList} />
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps({ browser, loading }) {
  const {
    blockChainInfo,
    txnCountList,
    blockCountList,
    homeNewBlockList,
    homeTransactionsList,
  } = browser;
  return {
    blockChainInfo,
    txnCountList,
    blockCountList,
    homeNewBlockList,
    homeTransactionsList,

    loading1: loading.effects['browser/queryBlockChain'],
    loading2: loading.effects['browser/queryTxnCount'],
    loading3: loading.effects['browser/queryBlocks'],
    loading4: loading.effects['browser/queryTransactions'],
  };
}

export default connect(mapStateToProps)(IndexPage);
