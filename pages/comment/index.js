// pages/comment/index.js
const WXAPI = require('apifm-wxapi');
WXAPI.init('bainana');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id !== undefined && options.id !== ''){
      this.setData({
        id: options.id
      })
      this.getCommentList(options.id);
    }
    
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

  getCommentList(id){
    WXAPI.commentList({
      refId: id
    }).then((res)=>{
      if(res.code == 0){
        this.setData({
          comments: res.data
        })
      }
    })
  },

  bindFormSubmit(e){
    console.log(e)
    const content = e.detail.value.content;
    console.log({
      content: content,
      refId: this.data.id,
      type: 3
    })
    WXAPI.addComment({
      content: content,
      refId: this.data.id,
      type: 3
    }).then((res) =>{
      if(res.code == 0){
        wx.showModal({
          title: '评论成功'
        })
        this.getCommentList(this.data.id)
      }
    })
  }
})