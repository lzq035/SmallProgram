// my.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasAuthorize: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({ hasAuthorize: true })
      this.setData({ userInfo: app.globalData.userInfo.userInfo })
      this.initDialog();
    } else {
      wx.getSetting({
        success: res => {
          res.authSetting['scope.userInfo'] == undefined ? this.setData({ hasAuthorize: false }) : this.setData({ hasAuthorize: true })
          if (res.authSetting['scope.userInfo'] == undefined) this.initDialog();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  initDialog() {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog1");
    !this.data.hasAuthorize ? this.showDialog() : this.hideDialog()
  },
  showDialog: function () {
    this.dialog.showDialog();
  },
  hideDialog:function() {
    wx.showTabBar();
    this.dialog.hideDialog();
  },
  confirmEvent: function () {
  },

  bindGetUserInfo: function (e) {
    // 用户点击授权后，这里可以做一些登陆操作
    if (e.detail.errMsg == 'getUserInfo:ok') {
      this.dialog.hideDialog();
      app.globalData.userInfo = e.detail
      this.setData({ userInfo: app.globalData.userInfo })
      this.setData({ hasAuthorize: true })
    }
    // this.login();
  },
  aboutUs: function () {
    wx.showModal({
      title: '掌上众益',
      content: `旨在服务员工信息化查询的小程序,众益企管官网：www.hzzyfw.com`,
      showCancel: false
    })
  },
  bind:function(){
    wx.navigateTo({
      url: '/pages/bind/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})