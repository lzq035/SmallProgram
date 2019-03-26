//home.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  navigateTo: function(e){
    const page = e.currentTarget.dataset.address;
    if(page === 'shop') {
      wx.showToast({
        title: '敬请期待',
        duration: 1000,
        
        // icon:'loading',
        image: '../../images/error_icon.png'
      }) 
    }else if(page === 'card') {
      wx.showActionSheet({
        itemList: ['查询消费记录','一卡通充值'],
        success(e){
        wx.showToast({
          title: '敬请期待',
          duration: 1000,
          image: '../../images/error_icon.png'
        })
        }
      })
    }else {
    wx.navigateTo({ url: `../${page}/${page}`})
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.showDialog()
  },
  showDialog: function () {
    this.dialog.showDialog();
  },

  confirmEvent: function () {
    this.dialog.hideDialog();
  },

  bindGetUserInfo: function () {
    // 用户点击授权后，这里可以做一些登陆操作
    // this.login();
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
    wx.showLoading({
      mask: true,
      title:'加载中...'
    })
    setTimeout(function(){
      wx.hideLoading();
      wx.stopPullDownRefresh();
    },3000)
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
