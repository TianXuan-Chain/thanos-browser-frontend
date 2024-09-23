function getServiceEnv() {
  return process.env.REACT_APP_ENV;
}

export function getBaseUrl() {
  const env = getServiceEnv();
  console.log(env);
  switch (env) {
    case 'dev':
      return 'http://deposit-nginx-dev.apps.danlu.netease.com/';
    case 'test':
      return 'http://deposit-nginx-test.apps.danlu.netease.com/';
    case 'prod':
      return 'http://prod';
    default:
      return '';
  }
}

export function getRequestBaseUrl() {
  return '';
}

export function getProxyBaseUrl() {
  return getBaseUrl();
}

// 业务状态码
export const SuccessCode = '200';
export const LoginExpireTimeCode = '-2';
export const DefaultErrorCode = '-1';
export const DefaultBusinessErrorMsg = '业务逻辑错误';
export const DefaultHttpErrorCode = '5001';
export const DefaultHttpErrorInfo = 'http请求出错，请稍后再试！';
export const DefaultNetErrorCode = '6001';
export const DefaultNetErrorInfo = '网络异常，请检查网络连接！';
