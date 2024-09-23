import React from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import queryString from 'query-string';
import { Button, Select, Input } from 'antd';
import {
  VerticalLeftOutlined,
  VerticalRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

const Option = Select.Option;
function SimplePagination({ location, dispatch, btList, pageTotal, currentPage }) {
  const isFirstPage = currentPage === 1 || btList.length === 0; // 如果是第一页，或者数据为空
  const isLastPage = currentPage === pageTotal || btList.length === 0; // 如何当前页码与总页码一样，或者数据为空
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;

  const handleChange = (value) => {
    let nq = {
      pageSize: parseInt(value),
    };
    query.startId = 0;
    query.type = 1;
    dispatch({ type: `browser/updatePage`, payload: { type: 1, defaultPage: 1 } });
    history.push(
      pathname +
        '?' +
        queryString.stringify({
          ...query,
          ...nq,
        }),
    );
  };
  const handlePageChanged = (startId, type) => {
    let nq = {
      startId,
      type,
    };
    let fakePage = {};
    // 下一页
    if (type === 1) {
      if (startId === 0) {
        fakePage = {
          type,
          defaultPage: 1,
        };
      } else {
        fakePage = {
          type,
        };
      }
    }
    // 上一页
    if (type === 2) {
      if (startId === 0) {
        nq = {
          startId: startId,
          type,
        };
        fakePage = {
          type,
          defaultPage: pageTotal,
        };
      } else {
        fakePage = {
          type,
        };
      }
    }
    dispatch({ type: 'browser/updatePage', payload: fakePage });
    history.push(
      pathname +
        '?' +
        queryString.stringify({
          ...query,
          ...nq,
        }),
    );
  };

  return (
    <div className={styles.group}>
      <div>
        每页显示
        <Select
          className={styles.select}
          defaultValue="10"
          value={query.pageSize || 10}
          size="small"
          onChange={handleChange}
        >
          <Option value="10">10</Option>
          <Option value="25">25</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
        条
      </div>
      <div className={styles.btns}>
        <Button
          className={styles.btn + ' ' + styles.btnBefore}
          disabled={isFirstPage}
          onClick={() => handlePageChanged(0, 1)}
          type="primary"
          shape="circle"
          icon={<VerticalRightOutlined />}
        />
        <Button
          className={styles.btn + ' ' + styles.btnBefore}
          disabled={isFirstPage}
          onClick={() => handlePageChanged(btList[0]['id'], 2)}
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
        />
        <Input
          className={styles.input}
          disabled={true}
          value={`第 ${currentPage} 页 共 ${pageTotal} 页`}
        />
        <Button
          className={styles.btn + ' ' + styles.btnNext}
          disabled={isLastPage}
          onClick={() => handlePageChanged(btList[btList.length - 1]['id'], 1)}
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
        />
        <Button
          className={styles.btn + ' ' + styles.btnNext}
          disabled={isLastPage}
          onClick={() => handlePageChanged(0, 2)}
          type="primary"
          shape="circle"
          icon={<VerticalLeftOutlined />}
        />
      </div>
    </div>
  );
}
function mapStateToProps({ browser, loading }) {
  const { btList, pageTotal, currentPage } = browser;
  return {
    btList,
    pageTotal,
    currentPage: Number(currentPage),
  };
}

export default connect(mapStateToProps)(SimplePagination);
