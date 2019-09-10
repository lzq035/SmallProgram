// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('config.js')
const API_BASE_URL = 'https://www.yourhome.ren'
const showToast = config => {
  wx.showToast({
    title: config.msg,
    icon: 'none',
    duration: config.duration ? config.duration : 2000,
    success: function () {
      if (config.fn) { config.fn(); }
    }
  });
};
const request = (url, needSubDomain, method, config) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url;
  const uid = wx.getStorageSync('uid');
  const token = wx.getStorageSync('token');
  let header = {
    'Content-Type': 'application/json',
    'uid': uid,
    'token': token
  };
  if (config.message) {
    wx.showLoading({
      title: config.message,
    });
  }
  if (config.header) {
    header = Object.assign({}, config.header, header)
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      dataType: 'json',
      data: config.params,
      header: header,
      success(res) {
        wx.hideLoading();
        resolve(res.data)
        if (res.data.code == 200) {
        } else {
          showToast({ msg: res.data.msg });
        }
      },
      fail(res) {
        wx.hideLoading();
        if (typeof (config.fail) === 'function') { config.fail(res); }
        showToast({ msg: res&&res.data&&res.data.msg ? res.data.msg:'服务器内部错误' });
        reject(res.data);
      },
      complete(res) {
        if (typeof (config.complete) === 'function') { config.complete(res); }
        console.groupCollapsed('接口：',_url);
        console.log('入参:', config.params);
        console.log('返回值：',res);
        console.groupEnd();
      }
    })
  })
}

const GET = (url, needSubDomain, config) => {
  return request(url, needSubDomain, 'get', config)
}

const POST = (url, needSubDomain, config) => {
  return request(url, needSubDomain, 'post', config)
}

module.exports = {
  login: (params) => {
    return POST('wx_login.php', true, { params, msg: '加载中...' })
  }
}