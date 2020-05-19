### 开放文档中的示例
1. [指南-起步-小程序简介中的示例](https://github.com/wechat-miniprogram/miniprogram-demo)
    
    --- 
2. [指南-小程序框架中的示例](https://developers.weixin.qq.com/s/l0gLEKmv6gZa)
//数据绑定示例
    
    --- 
3. [指南-小程序框架-视图层-事件系统中的示例](https://developers.weixin.qq.com/s/boDQoKmu7M7G)   
    (1) [小程序事件中的mark部分](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#mark)，这个示例还是不能直接运行，因为`mark`需要在2.7.1以上才能使用，所以需要设置基础库版本大于2.7.1才行
    (2) 当事件触发时，事件冒泡路径上所有的`mark` 会被合并，并返回给事件回调函数。   
    (3) `mark`类似`dataset`，是组件上绑定的数据，`dataset`会自动去除组件绑定属性的`data-`前缀，并且把变量进行大小写转换，而`mark`不会   
    (4) `mark`会包含从触发事件的节点到根节点上所有的`mark`属性值，而`dataset`仅包含一个节点的`data-`属性值
    
    --- 
4. [指南-小程序框架-视图层-事件系统-WXS响应事件中的示例](https://developers.weixin.qq.com/s/L1G0Dkmc7G8a)   
    (1) `index`页面，主页包括四个[`navigator`页面链接](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)，点击即可跳转到指定的页面   
    (2) [`wxs`文件介绍](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)：
      * 类似`js`但是并不完全一样，有自己的语法；
      * 每个`wxs`文件都是一个单独的模块，每个模块都有自己独立的作用域；
      * 每个模块想要对外暴露内部的私有变量和函数，只能通过`module.exports`实现；
      * 每个`wxs`模块都有一个内置的`module`对象；
      * 每个`module`对象有`exports`属性，通过该属性可对外共享本模块的私有变量和函数；
      * 在`wxml`文件中使用`wxs`模块中的方法示例：
        ```html
        <wxs src="./../tools.wxs" module="tools" />
        <view> {{tools.msg}} </view>
        <view> {{tools.bar(tools.FOO)}} </view>
        ```
    (3) 使用[`wxs`函数响应小程序事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html)
      * 可以在`Webview`层处理一些简单的逻辑，设置组件的`class`和样式；
      * 可以接受到两个参数，包括事件对象和触发事件的组件所在组件的`ComponentDescriptor`对象；
      * 视图层和逻辑层通信，`callMethod`是WXS里面调用逻辑层开发者代码的方法，而`WxsPropObserver`是逻辑层开发者代码调用WXS逻辑的机制；
      * `WxsPropObserver`使用示例：
        ```html
        <wxs module="test" src="./test.wxs"></wxs>
        <view change:prop="{{test.propObserver}}" prop="{{propValue}}" bindtouchmove="{{test.touchmove}}" class="movable"></view>
        ```
        `change:prop`属性前面带`change:前缀`是在`prop`属性被设置的时候触发WXS函数；值必须用`{{}}`括起来，类似监听属性；
      * `callMethod`使用示例：
        ```js
        function touchstart(event, ins) {//事件对象和触发事件的组件所在组件
          var touch = event.touches[0] || event.changedTouches[0]//touches触摸事件，当前停留在屏幕中的触摸点信息的数组；changedTouches触摸事件，当前变化的触摸点信息的数组
          startX = touch.pageX//距离文档左边的位置
          startY = touch.pageY//距离文档上边的位置
          ins.callMethod('testCallmethod', {//不能传函数参数，传函数参数js获取到的为{complete: null}
            complete: function(res) {
              console.log('args', res)
            }
          })
        }
        ```
    (4) 这部分示例比较多，已单独上传到github，[InteractiveAnimationDemo](https://github.com/gy37/InteractiveAnimationDemo)   
    (5) **右滑出现侧边菜单** 中，已实现单独抽屉效果，按钮也可以点击   
      * 刚开始只增加了按钮的点击事件，点击按钮时可以获取到想要修改属性的组件，想着可以直接设置样式，但是百度之后发现小程序中不允许在`js`中直接修改样式，需要绑定变量，通过修改变量来达到修改样式的目的；
      * 所以在`data`中增加`transform`属性，当点击按钮时修改`transform`属性的值，进而改变`wxml`中和`transform`属性绑定的控件的样式，试过之后发现可以点击按钮，但是按钮点击之后滑动，再点击就没反应了，找了一会儿发现是`wxs`文件中直接设置了控件的样式，和`js`中通过变量设置的样式重复，同时存在控件上？？？有问题导致`transform`属性不同步
      * 只通过`data`的`transform`属性来设置控件样式，使用`(3)`中的`callMethod`方法，在`wxs`中调用`js`的方法设置控件样式，而不是直接修改，从而实现按钮和滑动手势互不影响，都可以使用

    ---
5. [指南-小程序框架-视图层-简易双向绑定中的示例](https://developers.weixin.qq.com/s/8jXvobmV7vcj)   
    (1) [简易双向绑定](https://developers.weixin.qq.com/miniprogram/dev/framework/view/two-way-bindings.html)，示例：
      ```html
      <input model:value="{{value}}" />
      ```
      * 使用`model:`前缀，实现简易双向绑定，页面数据改变时，`data`中的数据也会同时改变

    (2) 直接运行示例代码，改变输入框内容，底部显示的内容没有改变，以为是什么bug。查了[微信开发社区](https://developers.weixin.qq.com/community/develop/mixflow)后，才知道简易双向绑定基础库版本`2.9.3 `之后才能使用。   
    (3) 点击编译器右上角的`Details`按钮，点`Local Settings`，点击`Debug Base Library`右边的下拉框，选择最高级的版本，在编译，即可正常体验小程序中的数据双向绑定。   
    (4) [`swiper`](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html#swiper)滑动视图容器，示例：
      ```html
      <!-- current当前所在滑块的index，model：绑定current和currentSwiperItem，他们的值会同时改变 -->
      <swiper class="swiper" model:current="{{ currentSwiperItem }}" indicator-dots="true" indicator-color="gray" indicator-active-color="red" autoplay="true" interval="2000"  duration="1000">
        <swiper-item class="center">swiper 的第 1 页</swiper-item>
        <swiper-item class="center">swiper 的第 2 页</swiper-item>
        <swiper-item class="center">swiper 的第 3 页</swiper-item>
      </swiper>
      ```
    (5) `another_comp.js`源码：
      ```js
      // index/another_comp.js
      //双向绑定数据流向：从内到外，scroll-view滚动时，调用绑定的滚动方法回调onScroll，在onScroll中设置scrollTop变量的值
      //从外到内，当scrollTop变量的值变化时，observers中的监听方法会被调用，在里面设置innerScrollTop的值为scrollTop变量的值，当innerScrollTop变化时，因为scroll-view的scroll-top绑定的是innerScrollTop变量的值，所以scroll-view会滚动到指定位置
      Component({
        properties: {
          scrollTop: Number
        },
        data: {
          list: 10,
          innerScrollTop: 0,
        },
        observers: {
          scrollTop: function(scrollTop) {//监听scrollTop变量值变化
            // control the updating frequency
            if (this._scrollTopUpdateScheduled) {//如果有定时器
              clearTimeout(this._scrollTopUpdateScheduled)//清空定时器，如果不清空会导致死循环，滚动的停不下来，hhh
            }
            this._scrollTopUpdateScheduled = setTimeout(() => {//开启新的定时器，250ms后设置innerScrollTop的值
              console.log("setTimeout callback invoked");
              this.setData({//把scrollTop变量的值复制给innerScrollTop变量
                innerScrollTop: scrollTop
              })
            }, 250)//250ms之后执行回调函数
            console.log("scrollTop value changed");
          }
        },
        methods: {
          onScroll: function(e) {//滚动时，调用绑定的方法
            this.setData({
              scrollTop: e.detail.scrollTop//获取滚动时的位置，设置给scrollTop变量
            })
          }
        },
      })
      ```
    
    ---
6. [指南-小程序框架-视图层-动画中的示例1](https://developers.weixin.qq.com/s/oHKxDPm47h5k)   
    (1) [界面动画的常见方式](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E7%95%8C%E9%9D%A2%E5%8A%A8%E7%94%BB%E7%9A%84%E5%B8%B8%E8%A7%81%E6%96%B9%E5%BC%8F)，示例中进行渐变和动画的view：
      ```html
      <view class="box {{extraClasses}}"
        bindtransitionend="transitionEnd"
        bindanimationstart="animationStart"
        bindanimationiteration="animationIteration"
      ></view>
      ```
      * `class="box {{extraClasses}}"`设置`view`的`class`，其中`extraClasses`是js中定义的，可以动态设置
      * `bindtransitionend`渐变结束时触发事件；`bindanimationstart`动画开始时的事件；`bindanimationiteration`动画结束一个阶段（完成一次属性值的变化）时的事件；`bindanimationend`动画结束时的事件;   

    (2) 示例中的`transition`动画：
      ```css
      .box-transition {
        transition: all 0.5s;/*所有属性都进行渐变，渐变动画进行0.5s*/
      }
      ```
      * `transition: property duration timing-function delay;`过渡动画的四个参数分别为：进行过渡动画的属性；过渡动画时间；过渡动画速度；过渡动画延时多久开始；默认值为all, 0, ease, 0；必须设置duration，否则没有渐变效果；

    (3) 示例中的`animation`动画：
      ```css
      @keyframes box-ani {/*指定帧动画*/
        from {margin-left: 60rpx}/*开始属性值*/
        to {margin-left: 590rpx}/*结束属性值*/
      }
      .box-animation {
        animation: box-ani 1s alternate infinite;/*动画名称，动画时长，偶数次反向播放，播放无限次*/
      }
      ```
      * `animation: name duration timing-function delay iteration-count direction;`动画参数分别为：绑定到选择器的关键帧动画名称，动画时长，动画速度，动画延时，动画播放次数，动画方向；默认值为none, 0, ease, 0, 1, normal/alternate；必须设置duration，否则没有动画效果；
    
    ---
7. [指南-小程序框架-视图层-动画中的示例2](https://developers.weixin.qq.com/s/P73kJ7mi7UcA)   
    (1) [`this.animate(selector, keyframes, duration, callback)`](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E5%85%B3%E9%94%AE%E5%B8%A7%E5%8A%A8%E7%94%BB)关键帧动画，示例：
      ```js
      this.animate('#container', [//父视图进行动画时，子视图也会跟随进行相应属性的改变，例如下面两个动画完成时，container转动90度，而block会转动180度
        { opacity: 0.9, rotate: 0, backgroundColor: '#FF0000' },
        { opacity: 0.6, rotate: 45, backgroundColor: '#00FF00' },
        { opacity: 0.3, rotate: 90, backgroundColor: '#0000FF' },
      ], 5000)
      this.animate('.block', [
        { scale: [1, 1], rotate: 0, ease: 'ease-out' },//ease设置动画速度,ease-in开始慢结束快，ease-out开始快结束慢
        { scale: [1.5, 1], rotate: 45, ease: 'ease-in'},//scale两个参数分别为x方向和y方向的缩放值
        { scale: [2, 1], rotate: 90 },
      ], 5000)
      ```
    (2) 带回调的关键帧动画，示例：
      ```js
      var that = this
      this.animate('#container1', [
        { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
        { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00', offset: 0.9},//offset指定帧动画的位置，取值【0，1】
        { opacity: 0.0, rotate: 90, backgroundColor: '#FF0000' },
        ], 5000, function () {//动画执行完成后的回调
          that.clearAnimation('#container1', { opacity: true, rotate: true }, function () {
            console.log("清除了#container上的动画属性")
          })
      })
      ```
      * 动画完成会改变控件属性，需要用`this.clearAnimation(selector, options, callback)`来清理动画的影响
      * 原工程中使用`bind(this)`来在回调函数中使用`this`，这样不太好，改用`that`
      * 不同的动画方法像是异步执行的，不会互相阻塞
    
    ---
8. [指南-小程序框架-视图层-动画中的示例3](https://developers.weixin.qq.com/s/994o8jmY7FcQ)   
    (1) 设置控件居中，需要设置父控件的css样式
      ```css
      view {
        display: flex;/*flex弹性布局*/
        align-items: center;/*item在交叉轴上的对齐方式*/
        justify-content: center;/*item在主轴上的对齐方式*/
      }
      ```
    (2) **#scroller**：[scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)，整个scroll-view   
    * `scroll-y`：y方向滚动；   
    * `throttle`：不清楚，查了文档`scroll-view`没有这个属性；   
    * `data-status-bar-height`：将数据绑定到组件，事件触发时，在`target`的`dataset`对象中可以获取到转换后的属性`statusBarHeight`；   

    (3) **.nav**：[view](https://developers.weixin.qq.com/miniprogram/dev/component/view.html#view)，导航栏区域；通过style行内样式设置`padding-top`，不推荐使用行内样式；
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
    * `.search_bar`搜索框: style行内样式设置`top`属性；因为`.search_bar`的`position`属性值为`absolute`，相对于有`position`属性的父元素定位，即为相对于`.nav`进行定位，距离它的顶部20px。
    * `.search_input`，输入框的样式：
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
    * `.search_input text`：[text](https://developers.weixin.qq.com/miniprogram/dev/component/text.html#text)，输入框中的文本样式：
      ```css
      .search_input text {
        padding-left: 20px;/*内左边距，预留icon位置*/
        line-height: 25px;
        display: inline-block;
        height: 25px;
      }
      ```
    * `.search_bar icon`: [icon](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html#icon)，微信提供的一些默认图标   

    (4) **.info**内容区域 
    * `.info`的样式：
      ```css
      .info {
        margin-top: env(safe-area-inset-top);/*外上边距，预留状态栏高度*/
        padding-top: 44px;/*内上边距，预留nav高度*/
        /* display: flex; */
        background-color: white;
      }
      ```
    * `.avatar`头像，行内样式`top: {{((statusBarHeight + 44) - 80) - 5}}px`，设置top为-21px和sticky一起使用当头像位置超过父元素（此处为scroll-view）21px之后固定；css文件中的样式为：
      ```css
      .avatar {
        /* display: inline-block; */
        display: flex;
        border-radius: 100%;
        border: 2px solid #FAFAFA;
        height: 100px;
        width: 100px;
        overflow: hidden;
        /* position: absolute; */
        left: 20px;
        /* top: 10px; */
        will-change: transform;/*提前告知浏览器该元素要进行transform动画，避免开始动画时闪屏*/
        /* transition: transform .03s linear; */
        z-index: 2;/*在导航栏图层上面*/
        /* contain: strict; */
        position: sticky;/*粘性定位，主要用在scroll-view中，相对于最近的scroll-box类型（含有滚动条或者设置了overflow属性）的父元素进行定位，当超过了设置的top/right/bottom/left的值时会固定*/
        /* top: -20px; */
        transform: translateY(-20px);/*通过transform属性对元素进行旋转，缩放，倾斜，平移等操作，顺序为rotate, scale, skew, translate*/
        transform-origin: left 75%;/*元素transform动画的原点，相对于元素左上角的距离，默认为自身中心点*/
      }
      ```
    * `.intro`简介，`bindtap`绑定点击事件
    * `.scroller2`: [scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)，页面中间的scroll-view；`scroll-x`设置滚动方向为横向滚动；`bindscroll`绑定滚动事件；`bindtouchend`绑定触摸结束事件；`scroll-with-animation`设置滚动条位置时是否使用动画；`scroll-left`设置横向滚动条的位置；
    * `menu_wrap`，scroll-view下的子控件，设置足够的宽度来显示内容；样式为：
      ```css
      .menu_wrap {
        white-space: nowrap;/*所有内容显示在一行，不换行*/
        padding: 9px 0;
        position: relative;
      }
      ```
    * `.menu_item_more`查看更多按钮，通过滚动动画控制是否显示；

    (5) **js内容**
    * `scrollLeft`和`scrollTop`属性，该元素显示内容与实际内容的距离，或者说向左或向上滚动的距离
    * `scrollWidth`和`scrollHeight`属性，该元素内容的实际宽度和高度
    * `deltaX`和`deltaY`属性，向右和向上滚动时返回正值，向左和向下滚动时返回负值
    * `createSelectorQuery()`创建选择器，用于选取指定元素
    * `select()`指定选择器，选取第一个匹配到的元素
    * [`fields(Object, Function)`](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html)获取节点信息，Object中指定需要返回哪些节点信息，Function回调方法，里面有需要的节点信息
    * [`this.animate(selector, keyframes, duration, callback)`](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E5%85%B3%E9%94%AE%E5%B8%A7%E5%8A%A8%E7%94%BB)关键帧动画
    * [`this.animate(selector, keyframes, duration, ScrollTimeline)`](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E6%BB%9A%E5%8A%A8%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB)滚动驱动的动画，示例：
      ```js
      //this.animate(selector, keyframes, duration, ScrollTimeline)滚动驱动的动画
      this.animate('.avatar', [{
        borderRadius: '0',
        borderColor: 'red',
        transform: 'scale(1) translateY(-25px)',
        offset: 0,//offset关键帧的偏移，范围【0，1】标识开始和结束帧
      }, {
        borderRadius: '25%',
        borderColor: 'green',
        transform: 'scale(.65) translateY(-25px)',
        offset: .4,
      }, {
        borderRadius: '50%',
        borderColor: 'blue',
        transform: `scale(.3) translateY(-20px)`,
        offset: 1
      }], 2000, {
        scrollSource: '#scroller',//滚动元素
        timeRange: 2000,//时间
        startScrollOffset: 0,//开始滚动动画的位置
        endScrollOffset: 85,//结束滚动动画的位置
      })
      ```    
    
    ---
9. [指南-小程序框架-视图层-动画中的示例4](https://developers.weixin.qq.com/s/cRTvdPmO7d5T)   
    (1) `js`格式化数字，前面补零
      ```js
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
      ```js
      this.formatNumber(12, 3);//调用方法，this.方法名
      ```
    (3) 在方法内部的其他方法中使用`this`时，需要先保存一下`this`
      ```js
      var that = this //在方法内部的其他方法中使用this时，需要先保存一下this
      ```
    
    ---
### 开放文档笔记

1. 生命周期    
  App生命周期 `onLaunch`-`onShow`-`onHide `  
  Page生命周期 `onLoad`-`onShow`-`onReady`-`onHide`-`OnUnload`   
2. 事件对象   
  `target`和`currentTarget`的区别，`currentTarget`为当前事件所绑定的组件，而`target`则是触发该事件的源头组件      
  `target`的`dataset`属性是当前组件上由`data-`开头的自定义属性组成的集合   
3. 事件   
  捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。