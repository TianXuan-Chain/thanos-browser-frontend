import request from '@/utils/request/request';

export async function queryBlockChain() {
  return request.post({
    url: '/browser/thanos/block/queryBlockChain',
    data: {},
  });
}
export async function queryTxnCount(data) {
  return request.post({
    url: '/browser/thanos/block/queryTxnCount',
    data,
  });
}
export async function queryBlocks(data) {
  return request.post({
    url: '/browser/thanos/block/queryBlocks',
    data,
  });
}
export async function queryNotices(data) {
  return request.post({
    url: '/browser/thanos/block/queryNotices',
    data,
  });
}
export async function queryTransactions(data) {
  return request.post({
    url: '/browser/thanos/block/queryTransactions',
    data,
  });
}
export async function globalSearch(data) {
  return request.post({
    url: '/browser/thanos/block/globalSearch',
    data,
  });
}
export async function queryTransactionDetail(data) {
  return request.post({
    url: '/browser/thanos/block/queryTransactionDetail',
    data,
  });
}
export async function queryBlockDetail(data) {
  return request.post({
    url: '/browser/thanos/block/queryBlockDetail',
    data,
  });
}
export async function queryContractDetail(data) {
  return request.post({
    url: '/browser/thanos/block/queryContract',
    data,
  });
}
const reSetParams = (payload) => {
  if (!!payload.type) payload.type = parseInt(payload.type, 10);
  if (!!payload.startId) payload.startId = parseInt(payload.startId, 10);
  payload.pageSize = !!payload.pageSize ? parseInt(payload.pageSize, 10) : 25;
  if (payload.type === 2 && payload.startId === 0) {
    payload.lastPageSize = parseInt(payload.lastPageSize);
  } else {
    if (typeof payload.lastPageSize !== 'undefined') {
      delete payload.lastPageSize;
    }
  }
  return payload;
};
export function queryTradeList(data) {
  return request.post({
    url: '/browser/thanos/block/queryTransactions',
    data,
  });
}

export function queryBlocksList(data) {
  return request.post({
    url: '/browser/thanos/block/queryBlocks',
    data,
  });
}
/**
 * 查询最近几天交易量接口
 * @param {object} data
 * @param {number} data.size // 最近 size 天
 * @param {number} data.chainId
 */
export function queryBlockCount(data) {
  return request.post({
    url: '/browser/thanos/block/queryBlockCount',
    data,
  });
}
