### 开放文档中的示例
1. [指南-起步-小程序简介中的示例](https://github.com/wechat-miniprogram/miniprogram-demo)
2. [指南-小程序框架中的示例](https://developers.weixin.qq.com/s/l0gLEKmv6gZa)
3. [指南-小程序框架-视图层-事件系统中的示例](https://developers.weixin.qq.com/s/boDQoKmu7M7G)
4. [指南-小程序框架-视图层-事件系统-WXS响应事件中的示例](https://developers.weixin.qq.com/s/L1G0Dkmc7G8a)
5. [指南-小程序框架-视图层-简易双向绑定中的示例](https://developers.weixin.qq.com/s/8jXvobmV7vcj)
6. [指南-小程序框架-视图层-动画中的示例1](https://developers.weixin.qq.com/s/oHKxDPm47h5k)
7. [指南-小程序框架-视图层-动画中的示例2](https://developers.weixin.qq.com/s/P73kJ7mi7UcA)
8. [指南-小程序框架-视图层-动画中的示例3](https://developers.weixin.qq.com/s/994o8jmY7FcQ)   
    (1) 设置控件居中，需要设置父控件的css样式
      ```css
      view {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      ```
    (2) **#scroller**：[scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)   
    * `scroll-y`：y方向滚动；   
    * `throttle`：不清楚，查了文档`scroll-view`没有这个属性；   
    * `data-status-bar-height`：将数据绑定到组件，事件触发时，在`target`的`dataset`对象中可以获取到转换后的属性`statusBarHeight`；   

    (3) **.nav**：[view](https://developers.weixin.qq.com/miniprogram/dev/component/view.html#view)   
    * style行内样式设置`padding-top`，不推荐使用行内样式；   
    * wxcss文件中的`.nav`样式：
      ```css
      .nav {
        position: fixed;/*fixed相对于浏览器窗口定位；absolute相对于有position属性的父元素定位；relative相对于自身的原始位置定位*/
        top: 0;
        width: 100%;
        background-color: #000;
        height: 44px;
        padding-top: env(safe-area-inset-top);/*获取上边框安全距离，适配iphoneX全面屏*/
        z-index: 1;/*设置元素的堆叠顺序，数字大的在上面，可以为负值，必须是设置了position属性的元素*/
      }
      ```
    * [open-data](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html) 用于展示微信开放的数据。`userNickName`获取用户昵称；`userAvatarUrl`获取用户头像；`userProvince`获取用户省份；`userCity`获取用户城市；
    * `.search_bar`: style行内样式设置`top`属性；因为`.search_bar`的`position`属性值为`absolute`，相对于有`position`属性的父元素定位，即为相对于`.nav`进行定位，距离它的顶部20px。
    * `.search_input`样式：
      ```css
      .search_input { 
        text-align: left;
        display: inline-block;/*行内块级元素*/
        width: 10%;/*宽度为父元素宽度的10%*/
        background-color: #F3F3F3;
        color: #888;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        border-radius: 3px;/*圆角*/
        overflow: hidden;/*超过部分隐藏*/
      }
      ```
    * `.search_input text`：[text](https://developers.weixin.qq.com/miniprogram/dev/component/text.html#text)样式：
      ```css
      .search_input text {
        padding-left: 20px;/*内左边距，预留icon位置*/
        line-height: 25px;
        display: inline-block;
        height: 25px;
      }
      ```
    * `.search_bar icon`: [icon](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html#icon)，微信提供的一些默认图标

      
9. [指南-小程序框架-视图层-动画中的示例4](https://developers.weixin.qq.com/s/cRTvdPmO7d5T)   
    (1) `js`格式化数字，前面补零
      ```javascript
      formatNumber: function(num, n) {
          var len = num.toString().length;
          while(len < n) {
              num = "0" + num;
              len++;
          }
          return num;
        }
      ```
    (2) 小程序的方法调用需要`this.`+`方法名`
      ```javascript
      this.formatNumber(12, 3);//调用方法，this.方法名
      ```
    (3) 在方法内部的其他方法中使用`this`时，需要先保存一下`this`
      ```javascript
      var that = this //在方法内部的其他方法中使用this时，需要先保存一下this
      ```

### 开放文档笔记

1. 生命周期    
  App生命周期 `onLaunch`-`onShow`-`onHide `  
  Page生命周期 `onLoad`-`onShow`-`onReady`-`onHide`-`OnUnload`   
2. 事件对象   
  `target`和`currentTarget`的区别，`currentTarget`为当前事件所绑定的组件，而`target`则是触发该事件的源头组件      
  `target`的`dataset`属性是当前组件上由`data-`开头的自定义属性组成的集合   
3. 事件   
  捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。