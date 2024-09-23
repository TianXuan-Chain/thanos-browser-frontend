import { useEffect } from 'react';
import { connect, Link, withRouter } from 'umi';
import moment from 'moment';
import { Card, Row, Col, Descriptions } from 'antd';
import styles from './index.less';
import HeaderWrapper from '../HeaderWrapper';
import TradeList from './TradeList';
import TradeListForContract from './TradeListForContract';

const DetailView = ({ location, tradeDetail, blockDetail,contractDetail, loading1, loading2,loading3, dispatch }) => {
  const currentType = location.query.detailType;
  const pkHash = location.query.hash;
  const blockTimestamp = parseInt(location.query.blockTimestamp, 10);
  useEffect(() => {
    if (currentType === 'trade') {
      dispatch({ type: 'browser/queryTransactionDetail', payload: { pkHash, blockTimestamp } });
    } else if (currentType === 'contract') {
      dispatch({ type: 'browser/queryContractDetail', payload: { contractAddress:pkHash } });
    } {
      dispatch({ type: 'browser/queryBlockDetail', payload: { pkHash } });
    }
    return () => {
      dispatch({ type: 'browser/setBlockDetail', payload: {} });
      dispatch({ type: 'browser/setTransactionDetail', payload: {} });
    };
  }, [currentType]);

  useEffect(() => {
    //0x7c7266a524e9191b984ce8fed3f3cf6518d885b7  0x658fd3a3fb7dfe38bc2c41772bb3bae5c4645acc
    console.log('pkHash 变化，currentType = ？',currentType)
    if (currentType === 'contract') {
      dispatch({ type: 'browser/queryContractDetail', payload: { contractAddress:pkHash } });
    }
  }, [pkHash])

  const BlockDetail = (prop) => {
    const { blockDetail } = prop;
    return (
      <Row gutter={[26, 26]}>
        <Col span={24}>
          <Card title="区块详情" loading={loading1}>
            <Descriptions column={1}>
              <Descriptions.Item label="区块高度">{blockDetail.number}</Descriptions.Item>
              <Descriptions.Item label="区块Hash">
                <span style={{ color: '#214790' }}>{blockDetail.pkHash}</span>
              </Descriptions.Item>
              <Descriptions.Item label="时间戳">
                {moment(blockDetail.timestamp).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item label="交易笔数">
                <span style={{ color: '#214790' }}>{blockDetail.evmTnxNum}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24}>
          <div className={styles.association}>
            <Card title="关联交易记录">
              <hr style={{ opacity: 0, margin: 0 }} />
              <TradeList blockNumber={blockDetail.number} />
            </Card>
          </div>
        </Col>
      </Row>
    );
  };

  const TradeDetail = (prop) => {
    const { tradeDetail } = prop;

    return (
      <Row gutter={[26, 26]}>
        <Col span={24}>
          <Card title="交易详情" loading={loading2}>
            <Descriptions column={1}>
              <Descriptions.Item label="交易Hash">{tradeDetail.pkHash}</Descriptions.Item>
              <Descriptions.Item label="区块Hash">{tradeDetail.blockHash}</Descriptions.Item>
              <Descriptions.Item label="区块高度">
                <Link
                  className={styles.highlight}
                  to={`/detail?detailType=blocks&hash=${tradeDetail.blockHash}`}
                >
                  {tradeDetail.blockNumber}
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label="时间戳">
                {moment(tradeDetail.blockTimestamp).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item label="发起账户">
                <span style={{ color: '#214790' }}>{tradeDetail.transactionFrom}</span>
              </Descriptions.Item>
              {/* <Descriptions.Item label="接收账户">{tradeDetail.transactionTo}</Descriptions.Item> */}
              <Descriptions.Item label="合约地址">{tradeDetail.contractAddress}</Descriptions.Item>
              <Descriptions.Item label="交易状态">
                {tradeDetail.tradeStat === 1 ? '交易成功' : '交易失败'}
              </Descriptions.Item>
              {tradeDetail.bizData ? (
                <Descriptions.Item label="存证数据Hash">{tradeDetail.bizData}</Descriptions.Item>
              ) : null}
            </Descriptions>
          </Card>
        </Col>
      </Row>
    );
  };

  const ContractDetail = (prop) => {
    const { contractDetail } = prop;
    return (
      <Row gutter={[26, 26]}>
        <Col span={24}>
          <Card title="合约详情" loading={loading3}>
            <Descriptions column={1}>
              <Descriptions.Item label="合约地址">
                {pkHash}
              </Descriptions.Item>
              <Descriptions.Item label="合约名称">
                <span >{contractDetail.contractName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="数量">
                {contractDetail.totalLimitSupply === -1 ? '未限制' : contractDetail.totalLimitSupply}
              </Descriptions.Item>
              <Descriptions.Item label="合约类型">
                <span >{contractDetail.contractProtocol === -1 ?'未定义':['','721','1155'][contractDetail.contractProtocol]}</span>
              </Descriptions.Item>
              <Descriptions.Item label="创建者">
                <span >{contractDetail.contractDeployAddress}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24}>
          <div className={styles.association}>
            <Card title="关联交易记录">
              <hr style={{ opacity: 0, margin: 0 }} />
              <TradeListForContract contractAddress={pkHash} />
            </Card>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <HeaderWrapper>
      
      {currentType === 'blocks' && 
        <BlockDetail blockDetail={blockDetail} />
      }
      {currentType === 'trade'&& 
        <TradeDetail tradeDetail={tradeDetail} />
      }
      {currentType === 'contract'&&
       <ContractDetail contractDetail={contractDetail}/>}
    </HeaderWrapper>
  );
};
export default connect(({ browser, loading }) => ({
  blockDetail: browser.blockDetail,
  tradeDetail: browser.tradeDetail,
  contractDetail:browser.contractDetail,
  loading1: loading.effects['browser/queryTransactionDetail'],
  loading2: loading.effects['browser/queryBlockDetail'],
  loading3: loading.effects['browser/queryContractDetail'],
}))(withRouter(DetailView));
