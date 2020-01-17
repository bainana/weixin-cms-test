// pages/index/index.js
const app = getApp()
const WXAPI = require('apifm-wxapi');
WXAPI.init('bainana');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticles();//获取文章列表
    this.getbanners();//获取banner
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

  async getArticles(){
    WXAPI.cmsArticles('isRecommend').then((res) =>{
      if(res.code == 0){
        this.setData({
          articles: res.data
        })
      }
      console.log(res)
    })
  }
,
  async getbanners(){
    WXAPI.banners().then((res) => {
      console.log(res);
      if(res.code == 0){
        this.setData({
          banners: res.data
        })
      }
    })
  }
})