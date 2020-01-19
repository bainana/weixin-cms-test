// pages/category/index.js
const WXAPI = require('apifm-wxapi');
WXAPI.init('bainana');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 7,
    articles: []
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
    console.log('到底了')
    this.setData({
      page: this.data.page+1
    })
    this.getArticles(this.data.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  cmsCategories() { // 读取所有的分类数据
    WXAPI.cmsCategories().then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
        this.setData({
          categories: res.data,
          currentCate: res.data[0].name,
          id: res.data[0].id
        });
        this.getArticles(this.data.id);
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
    this.data.articles = [];
    this.setData({
      id: id,
      page: 1
    })
    this.setData({
      currentCate: e.currentTarget.dataset.title
    });
    this.getArticles(id);
  },

  getArticles(id){
    wx.showLoading({
      title: '加载中',
    })
    WXAPI.cmsArticles({
      categoryId: id,
      page: this.data.page,
      pageSize: this.data.pageSize
    }).then((res)=>{
      wx.hideLoading()
      if(res.code == 0){
        this.setData({
          articles: this.data.articles.concat(res.data)
        })
      }else{
        this.setData({
          articles: this.data.articles
        })
      }
    })
  },

  //跳转到详细页面
  toDetail(e){
    console.log(e);
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/articles-detail/index?id='+ id,
    })
  }
})