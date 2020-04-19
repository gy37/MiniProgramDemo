//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World 123',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({//nevigateTo和redirectTo方法的url中可以拼接参数，实现页面传参
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) { //页面加载完成时，已经有用户信息数据，直接设置
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){ //页面加载完成时，没有用户信息数据，等待回调，在回调中设置
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {

  },
  onReady: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  // 点击获取用户信息按钮成功回调，detail中包含用户信息
  onGetUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
