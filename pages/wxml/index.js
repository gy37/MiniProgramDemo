// pages/wxml/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    time: (new Date()).toString(),
    var2: undefined,
    var3: null,
    var4: "var4",
    a: 1,
    b: 2,
    c: 3,
    array: [{
      message: 'foo',
    }, {
      message: 'bar',
    }],
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'}
    ],
    numberArray: [1, 2, 3, 4],
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2021-01-10'
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  switch: function(e) {
    const length = this.data.objectArray.length;
    for (let i = 0; i < length; i++) {
      const x = Math.floor(Math.random() * length);
      const y = Math.floor(Math.random() * length);
      const temp = this.data.objectArray[x];
      this.data.objectArray[x] = this.data.objectArray[y];
      this.data.objectArray[y] = temp;
    }
    this.setData({
      objectArray: this.data.objectArray
    });
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length;
    this.data.objectArray = [{
      id: length,
      unique: 'unique_' + length
    }].concat(this.data.objectArray);
    this.setData({
      objectArray: this.data.objectArray
    });
  },
  addNumberToFront: function(e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray);
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})