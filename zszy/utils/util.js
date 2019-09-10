import WXAPI from '../wxapi/main.js';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
};
const formatMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return [year, month].map(formatNumber).join('-')
};

const WXLOGIN = (encryptedData, iv) => {
  //通过code获取用户信息
  return new Promise((resolve, reject) => {
    wx.login({
      // provider: 'weixin',
      success: function (res) {
        let code = res.code;
        WXAPI.login({ code, encryptedData, iv }).then(res => {
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      }
    });
  })

}

const hasAuthorizeFun = (fn) => {
  if (getApp().globalData.userInfo) {
  } else {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] == undefined) fn();
      }
    })
  }
}

module.exports = {
  formatTime,
  formatDate,
  formatMonth,
  hasAuthorizeFun,
  WXLOGIN,
}
