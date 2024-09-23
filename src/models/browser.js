import * as homeService from '@/services/browser';
import { connect, history } from 'umi';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'browser',
  state: {
    blockDetail: {}, // 区块详情
    tradeDetail: {}, // 交易详情
    contractDetail: {},// 合约详情

    blockChainInfo: {
      lastBlock: 0,
      txn: 0,
      networkStatus: 1,
      activeNodes: 0,
      totalNodes: 0,
    },
    // 交易量走势
    txnCountList: [],
    // 出块量走势
    blockCountList: [],
    // 首页最新区块列表
    homeNewBlockList: [],
    // 首页最新的交易列表
    homeTransactionsList: [],

    blocksInfo: {
      list: [],
      total: 0,
    },

    transactionsInfo: {
      list: [],
      total: 0,
    },

    globalInfo: {
      list: [],
      total: 0,
    },
  },
  reducers: {
    setBlockChainInfo(state, { payload }) {
      return {
        ...state,
        blockChainInfo: payload,
      };
    },
    setBtData(state, { payload: { data: btList, pageTotal, total } }) {
      return { ...state, btList, pageTotal, total };
    },
    setTxnCountList(state, { payload }) {
      return { ...state, txnCountList: payload };
    },
    setBlockCountList(state, { payload }) {
      return { ...state, blockCountList: payload };
    },
    setHomeNewBlockList(state, { payload }) {
      return { ...state, homeNewBlockList: payload };
    },
    setHomeTransactionsList(state, { payload }) {
      return { ...state, homeTransactionsList: payload };
    },
    setBlockDetail(state, { payload }) {
      return { ...state, blockDetail: payload };
    },
    setContractDetail(state, { payload }) {
      return { ...state, contractDetail: payload };
    },
    setTransactionDetail(state, { payload }) {
      return { ...state, tradeDetail: payload };
    },
    setTransactionsInfo(state, { payload }) {
      return { ...state, transactionsInfo: payload };
    },
    setBlocksInfo(state, { payload }) {
      return { ...state, blocksInfo: payload };
    },
  },
  effects: {
    *queryBlocksList({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryBlocksList, payload);
        if (data && Array.isArray(data.list)) {
          yield put({
            type: 'setBlocksInfo',
            payload: {
              list: data.list,
              total: data.totalCount >= 20 * 100 ? 20 * 100 : data.totalCount,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    *queryTradeList({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryTradeList, payload);
        if (data && Array.isArray(data.list)) {
          yield put({
            type: 'setTransactionsInfo',
            payload: {
              list: data.list,
              total: data.totalCount >= 20 * 100 ? 20 * 100 : data.totalCount,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    *queryTransactionDetail({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryTransactionDetail, payload);
        if (data) {
          yield put({
            type: 'setTransactionDetail',
            payload: data,
          });
        }
      } catch (error) {}
    },
    *queryBlockDetail({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryBlockDetail, payload);
        if (data) {
          yield put({
            type: 'setBlockDetail',
            payload: data,
          });
        }
      } catch (error) {}
    },
    *queryContractDetail({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryContractDetail, payload);
        if (data) {
          yield put({
            type: 'setContractDetail',
            payload: data,
          });
        }
      } catch (error) {}
    },
    // 获取区块链信息
    *queryBlockChain(_, { call, put }) {
      try {
        const { data } = yield call(homeService.queryBlockChain);
        if (data) {
          yield put({
            type: 'setBlockChainInfo',
            payload: data,
          });
        }
      } catch (error) {}
    },
    // 查询最近几天的交易量走势，默认 7 天
    *queryTxnCount({ payload }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryTxnCount, payload);
        if (data && Array.isArray(data)) {
          yield put({
            type: 'setTxnCountList',
            payload: data.map((elem) => {
              const date = new Date(elem.pkDate);
              elem.dataStr = moment(date).format('M/D');
              elem.Transactions = elem.txnCount;
              return elem;
            }),
          });
        }
      } catch (error) {}
    },
    // 区块分页列表查询接口 - 首页调用 最新10条记录
    *queryBlocks({ payload }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryBlocksList, {
          ...payload,
        });
        if (data && Array.isArray(data.list)) {
          yield put({
            type: 'setHomeNewBlockList',
            payload: data.list,
          });
        }
      } catch (error) {
        console.log('error: ', error);
      }
    },
    // 交易列表查询接口 - 首页调用 最新10条记录
    *queryTransactions({ payload }, { call, put }) {
      try {
        const { data } = yield call(homeService.queryTransactions, payload);
        if (data && Array.isArray(data.list)) {
          yield put({
            type: 'setHomeTransactionsList',
            payload: data.list,
          });
        }
      } catch (error) {}
    },
    // 搜索接口
    *queryGlobalSearch({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(homeService.globalSearch, payload);
        if (data) {
          if (!data.totalCount) {
            message.info('无结果')
            return
          }
          let url = '';
          let type = data.type;
          let v = data.searchValue;
          if (type === 3) {
            url = `/detail?detailType=contract&hash=${v}`
          }else{
            url = `${
              type === 1 ? '/trades?' : '/blocks?'
            }searchValue=${v}&form=search`;
          }
          


          if (type === 1) {
            // 交易
            yield put({
              type: 'setTransactionsInfo',
              payload: {
                list: data.list,
                total: data.totalCount,
              },
            });
          }
          if (type === 2) {
            // 区块
            yield put({
              type: 'setBlocksInfo',
              payload: {
                list: data.list,
                total: data.totalCount,
              },
            });
          }
          history.replace(url);
        }
      } catch (error) {
        console.log(error);
        message.error('搜索记录不存在');
      }
    },
  },
};
