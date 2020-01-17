// pages/category/index.js
const WXAPI = require('apifm-wxapi');
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
    this.cmsCategories()
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
  cmsCategories() { // 读取所有的分类数据
    WXAPI.cmsCategories().then(res => {
      console.log(res.data)
      if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
        this.setData({
          categories: res.data,
          currentCate: res.data[0].name
        });
        this.getArticles(res.data[0].id);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },

  changeCate(e){
    const id = e.currentTarget.dataset.id;
    this.setData({
      currentCate: e.currentTarget.dataset.title
    });
    this.getArticles(id);
  }
,
  getArticles(id){
    WXAPI.cmsArticles({
      categoryId: id
    }).then((res)=>{
      if(res.code == 0){
        console.log(res.data)
        this.setData({
          articles: res.data
        })
      }else{
        this.setData({
          articles: []
        })
      }
    })
  }
})