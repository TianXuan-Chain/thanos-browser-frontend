import React, { useEffect } from 'react';
import styles from './index.less';
import { Input, message } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRef } from 'react';

const SearchDetail = (props) => {
  const inputRef = useRef();
  const [isActiveInput, setActiveInput] = useState(false);
  const search = (e) => {
    const v = inputRef.current.input.value;
    if (!!v) {
      props.onSearch(v);
    } else {
      message.warning('请输入查询条件');
    }
  };
  const inactiveInput = ()=>{
    setActiveInput(false)
  }
  const activeInput = ()=>{
    setActiveInput(true);
  }
 
  useEffect(()=>{
    document.addEventListener('click',inactiveInput)
    return ()=>{
      document.removeEventListener('click',inactiveInput)
    }
  })
  return (
    <div className={styles.container}>
      <div id="components-input-demo-search-input">
        <div onClick={(e)=>{e.stopPropagation()}}>
          <Input
            ref={inputRef}
            className={`${styles.globalSearchInput} ${isActiveInput ? styles.expand : styles.fold}`}
            size="small"
            placeholder="搜索 地址/交易hash/区块hash/块高"
            suffix={
              <SearchOutlined
                style={{ fontSize: '24px', color: '#343434', cursor: 'pointer' }}
                onClick={()=>{isActiveInput ? search() : activeInput()}}
              />
            }
            onPressEnter={search}
            
          />
        </div>
      </div>
    </div>
  );
};
export default SearchDetail;
