import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';
/**
 * http error handler
 */
import httpErrorHandler from './httpErrorHandler';

import {
  SuccessCode,
  LoginExpireTimeCode,
  DefaultBusinessErrorMsg,
  DefaultErrorCode,
  DefaultNetErrorCode,
  DefaultNetErrorInfo,
} from './config';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // 处理http请求错误 未处理业务错误 业务错误baseRequest中处理
  errorHandler: httpErrorHandler,
  credentials: 'include', // 默认请求是否带上cookie
});

function baseRequest(url, options) {
  return new Promise((resolve) => {
    request(url, options)
      .then((response) => {
        const { code, msg, data } = response;
        // 业务正常
        if (code === SuccessCode) {
          resolve({
            data
          });
        } else if (code === LoginExpireTimeCode) {
          // 重新登录
        } else {
          notification.error({
            message: `请求出错，错误码 ${code || DefaultErrorCode}`,
            description: msg || DefaultBusinessErrorMsg,
          });
          resolve({
            error: {
              errorCode: code || DefaultErrorCode,
              errorMsg: msg || DefaultBusinessErrorMsg,
            },
          });
        }
      })
      .catch(() => {
        resolve({
          error: {
            errorCode: DefaultNetErrorCode,
            errorMsg: DefaultNetErrorInfo,
          },
        });
      });
  });
}

baseRequest.get = (options) => {
  const { url } = options;
  return baseRequest(url, {
    ...options,
    method: 'GET',
  });
};

baseRequest.post = (options) => {
  const { url } = options;
  return baseRequest(url, {
    ...options,
    method: 'POST',
  });
};

export default baseRequest;
