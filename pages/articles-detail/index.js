// pages/article-detail/index.js
const WXAPI = require('apifm-wxapi');
const wxParse = require('../../wxParse/wxParse.js');
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
    
    wx.showLoading({
      title: '加载中',
    })
    const id = options.id;
    console.log(options)
    WXAPI.cmsArticleDetail(id).then((res)=>{
      console.log(res)
      wx.hideLoading();
      if(res.code == 0){
        this.setData({
          article: res.data
        })
        wxParse.wxParse('content','html',this.data.article.content,this,5)
      }
    })
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
  goComment(e){
    console.log(e.currentTarget)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/comment/index?id=' + id,
    })
  }
})