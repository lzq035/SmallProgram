// my.js
//获取应用实例
const app = getApp();
const { hasAuthorizeFun } = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasAuthorize: false,
    defaultImg:'/images/user.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) this.setData({ hasAuthorize:true, userInfo: app.globalData.userInfo || {} })
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
    // wx.showTabBar();
    this.dialog.hideDialog();
  },
  confirmEvent: function () {
  },

  bindGetUserInfo: function (e) {
    // 用户点击授权后，这里可以做一些登陆操作
    if (e.detail.errMsg == 'getUserInfo:ok') {
      // this.dialog.hideDialog();
      app.globalData.userInfo = e.detail.userInfo
      this.setData({ hasAuthorize: true, userInfo: app.globalData.userInfo || {} })
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
    hasAuthorizeFun((hasAuthorize, userInfo) => {
      this.setData({ hasAuthorize, userInfo: hasAuthorize ? userInfo:{}})
      this.initDialog();
    });
    if (!this.data.hasAuthorize) return;
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