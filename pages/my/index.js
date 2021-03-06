// pages/my/index.js
const WXAPI = require('apifm-wxapi')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.openSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  author(e){
    wx.navigateTo({
      url: '/pages/wexin/index'
    })
  },
  register(e){

  },
  login(e){
    wx.showModal({
      title: '是否授权',
      success:(res)=>{
        if(res.cancel){

        }else{
          wx.getSetting({
            success(res) {
              console.log(res)
              if (res.authSetting['scope.userInfo']) {
                wx.login({
                  success: (res) => {
                    console.log('weixin', res.code)
                    WXAPI.login_wx(res.code).then((res) => {
                      console.log('wxapi', res)
                      if (res.code == 10000) {

                      }
                      if (res.code != 0) {
                        // 登录错误
                        wx.showModal({
                          title: '无法登录',
                          content: res.msg,
                          showCancel: false
                        })
                        return;
                      }
                    })
                  }
                })
              } else {
                wx.showModal({
                  title: '请授权',
                  content: '',
                });
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    console.log('userInfo: success')
                  },
                  fail(){
                    console.log('userIfo: fail')
                  }
                })
              }
            },
            fail(err) {
              console.log(err)
            }
          });
        }
      }
    })
    
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})