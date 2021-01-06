### 开放文档中的示例
1. [指南-起步-小程序简介中的示例](https://github.com/wechat-miniprogram/miniprogram-demo)   
    总的例子，用的时候在里面仔细找找，看看是怎么用的

    --- 
2. [指南-小程序框架中的示例](https://developers.weixin.qq.com/s/l0gLEKmv6gZa)   
    (1) 简单介绍：
      * `{{name}}`绑定js中的name变量，`js`中`name`变量改变时，此处的值会同步改变
      * `bindtap="changeName"`绑定点击事件，点击时触发`js`中的`changeName`方法
      * 小程序的`js`中修改变量值，不能直接修改而是通过`setData`方法
    
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

    (6) **滚动菜单栏贴顶** 中，`title`可以点击
      * 事件的`target`属性是触发事件的组件，`currentTarget`属性是绑定事件的组件
      * 内容第一个`view`中增加文字，一开始会显示，滑动之后消失？背景`image`太高，会覆盖内容，修改`image`高度，不要覆盖内容

    (7) **跟随swiper的图片切换效果**中，使用滑块视图容器[`swiper`](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)控件
      * 部分图片显示不全？`image`的`mode`属性设置图片显示模式，默认为`scaleToFill`填充，`aspectFit`保持缩放比例填充（长边），`aspectFill`保持缩放比例填充（短边），`widthFix`宽度不变高度按比例缩放，`heightFix`高度不变宽度自动缩放，`center`只显示指定部分
      * 如何显示图片真实高度，根据图片高度设置`swiper`和`swiper-item`高度？无法动态设置图片高度，因为要固定`size`传到`wxs`文件中，根据高度差进行动画

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
10. [指南-小程序运行时-运行机制中的示例](https://developers.weixin.qq.com/s/ELP5uTmN7E8l)   
    (1) `restartStrategy`配置项，指定下次冷启动后可以直接回到这个页面
      * 默认值`homePage`，如果从这个页面推出，下次从首页冷启动
      * `homePageAndLatestPage`，如果从这个页面推出，下次冷启动后立即加载这个页面，页面参数保持不变
    (2) `onSaveExitState`，小程序被销毁之前，会调用这个回调函数保存一些数据，下次启动时可以通过`exitState`获取保存的数据
      * `onSaveExitState`回调函数返回值可以包含两项：`data`保存的数据；`expireTimeStamp`保存数据的超时时间
    
    ---
11. [指南-自定义组件-组件模板和样式中的示例1](https://developers.weixin.qq.com/s/1udXLnmi6KY2)   
    (1) 在模板中引用自定义组件时，需要在模板的`json`中显示定义
      ```json
      {
        "usingComponents": {
          "my-component": "/components/component-tag-name"
        }
      }
      ```
    (2) 在自定义组件中可以提供一个`<slot>`节点，用于承载组件引用时提供的子节点
      ```html
      <!-- 组件模板 -->
      <view class="wrapper">
        <view>这里是组件的内部节点</view>
        <slot></slot>
      </view>
      ```
      ```html
      <!-- 引用组件的页面模版 -->
      <view>
        <my-component>
          <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
          <view>这里是插入到组件slot中的内容</view> 
        </my-component>
      </view>
      ```
    (3) 默认一个`wxml`中只能有一个`slot`，如果要在组件中使用多个`slot`，需要在组件的`js`中声明
      ```js
      Component({
        options: {
          multipleSlots: true // 在组件定义时的选项中启用多slot支持
        },
        properties: { /* ... */ },
        methods: { /* ... */ }
      })
      ```
    (4) 组件中使用多个`slot`，要以不同的`name`来区分
      ```html
      <!-- 组件模板 -->
      <view class="wrapper">
        <slot name="before"></slot>
        <view>这里是组件的内部细节</view>
        <slot name="after"></slot>
      </view>
      ```
      ```html
      <!-- 引用组件的页面模板 -->
      <view>
        <component-tag-name>
          <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
          <view slot="before">这里是插入到组件slot name="before"中的内容</view>
          <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
          <view slot="after">这里是插入到组件slot name="after"中的内容</view>
        </component-tag-name>
      </view>
      ```

    ---
12. [指南-自定义组件-组件模板和样式中的示例2](https://developers.weixin.qq.com/s/jAgvwKm16bZD)   
    (1) 组件样式，在组件中不能使用`id`选择器，属性选择器和标签选择器；子元素选择器只能用于`view`组件及其子节点之间；推荐使用`class`选择器   
      ```css
      #a { } /* 在组件中不能使用 */
      [a] { } /* 在组件中不能使用 */
      button { } /* 在组件中不能使用 */
      .a > .b { } /* 除非 .a 是 view 组件节点，否则不一定会生效 */
      ```
    (2) 组件可以指定所在节点的默认样式，使用`:host`选择器
      ```css
      /* 组件 custom-component.wxss */
      :host {
        color: yellow;
      }
      ```

    ---
13. [指南-自定义组件-组件模板和样式中的示例3](https://developers.weixin.qq.com/s/xPQhJcm37e7h)   
    (1) 组件样式隔离，通过在组件的`js`文件中设置`options`的隔离选项`styleIsolation`来指定   
      ```js
      Component({
        options: {
          styleIsolation: 'isolated'
        }
      })
      ```
    (2) `js`文件中设置`styleIsolation`选项的值（>2.6.5）：   
      * `isolated`表示启用样式隔离，只对组件内的元素有影响（默认值）
      * `apply-shared`表示页面的样式将会影响自定义组件，但组件中的样式不会影响页面
      * `shared`表示页面的样式将会影响自定义组件，组件中的样式也会影响页面，和设置了`apply-shared`和`shared`的自定义组件

    (3) `Component`构造器用于构造页面时，页面的`styleIsolation`默认值为`shared`，其他可选值：
      * `page-isolated`表示这个页面禁用`app.wxss`中的样式，同时页面的样式不会影响其他自定义组件
      * `page-apply-shared`表示这个页面禁用`app.wxss`中的样式，同时页面的样式不会影响其他自定义组件，但设置为`shared`的自定义组件会影响该页面
      * `page-shared`表示这个页面禁用`app.wxss`中的样式，同时页面的样式会影响到其他设置为`appley-shared`和`shared`的自定义组件，同时也会受到设置为`shared`的自定义组件的影响

    (4) 修改`page-isolated`为`page-apply-shared`
      * 页面中的文字变为红色？*page-apply-shared<shared* 
      * `apply-shared`组件中的文字变为蓝色？*apply-shared>(page-apply-shared,shared)*
      * `shared`组件中的文字变为红色？*shared>page-apply-shared*

    (5) 修改`page-isolated`为`page-shared`
      * 页面中的文字变为红色？*page-shared<shared* 
      * `apply-shared`组件中的文字变为蓝色？*apply_shared>page-shared*
      * `shared`组件中的文字变为红色？*shared>page-shareds*
      
    (6) `page-shared`页面样式会影响到`shared`组件的样式，同时也会受到设置为`shared`的自定义组件的影响，那么那个优先级高呢？
      * `isolated`>`apply-shared`>`shared`*组件之间*
      * `shared`>`page-isolated`*组件和页面之间*
      * `shared`>`page-apply-shared`*组件和页面之间*
      * `shared`>`page-shared`*组件和页面之间*

    (7) `json`文件中设置`styleIsolation`的值（>2.10.1）:   

    ---
14. [指南-自定义组件-组件模板和样式中的示例4](https://developers.weixin.qq.com/s/VkTd7Fm37ggl)   
    (1) 从2.10.1开始，可以在页面或者自定义组件的`json`文件中配置`styleIsolation`属性，不需要再`js`文件中单独配置   
    (2) 从2.2.3开始支持`addGlobalClass`选项，在`js`中设置`addGlobalClass: true`，等价于设置`styleIsolation: apply-shared`   
    
    ---
15. [指南-自定义组件-组件模板和样式中的示例5](https://developers.weixin.qq.com/s/rbgNNKmE6bZK)   
    (1) 外部样式类,组件可以接受外部传入的样式类。在组件中用`externalClasses`定义若干个外部样式类。
      ```js
      /* 组件 custom-component.js */
      Component({
        externalClasses: ['my-class']
      })
      ```
      ```html
      <!-- 组件 custom-component.wxml -->
      <custom-component class="my-class">这段文本的颜色由组件外的 class 决定</custom-component>
      ```
      ```html
      <!-- 页面的 WXML -->
      <custom-component my-class="red-text" />
      ```
      ```css
      /* 页面的WXSS */
      .red-text {
        color: red;
      }
      ```

    ---
16. [指南-自定义组件-组件模板和样式中的示例6](https://developers.weixin.qq.com/s/AlV9fEmF7Dh8)   
    (1) 虚拟化组件节点，默认情况下组件本身的节点是普通节点，有时候不希望设置组件本身的节点，可以使用虚拟化节点
      ```js
      Component({
        options: {
          virtualHost: true
        },
        properties: {
          style: { // 定义 style 属性可以拿到 style 属性上设置的值
            type: String,
          }
        },
        externalClass: ['class'], // 可以将 class 设为 externalClass
      })
      ```
    
    ---
17. [指南-自定义组件-组件间通信与事件示例1](https://developers.weixin.qq.com/s/DFfYSKmI6vZD)   
    (1) 自定义组件触发事件时，需要使用`triggerEvent`方法，指定事件名、detail对象和事件选项   
    ```html
    <!-- 在自定义组件中 -->
    <button bindtap="onTap">点击这个按钮将触发“myevent”事件</button>
    ```
    ```js
    Component({
      properties: {},
      methods: {
        onTap: function(){
          var myEventDetail = {} // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          this.triggerEvent('myevent', myEventDetail, myEventOption)
        }
      }
    })
    ```

    ---
18. [指南-自定义组件-组件间通信与事件示例2](https://developers.weixin.qq.com/s/UGfljKm66zZ1)   
    (1) 自定义组件触发事件时，有事件选项。包括`bubbles`是否冒泡；`comoposed`是否可以穿越组件边界，到达其他组件内部；`capturePhase`是否有捕获阶段
    ```html
    // 页面 page.wxml
    <another-component bindcustomevent="pageEventListener1">
      <my-component bindcustomevent="pageEventListener2"></my-component>
    </another-component>
    // 组件 another-component.wxml
    <view bindcustomevent="anotherEventListener">
      <slot />
    </view>
    // 组件 my-component.wxml
    <view bindcustomevent="myEventListener">
      <slot />
    </view>
    ```
    ```js
    // 组件 my-component.js
    Component({
      methods: {
        onTap: function(){
          this.triggerEvent('customevent', {}) // 只会触发 pageEventListener2
          this.triggerEvent('customevent', {}, { bubbles: true }) // 会依次触发 pageEventListener2 、 pageEventListener1
          this.triggerEvent('customevent', {}, { bubbles: true, composed: true }) // 会依次触发 pageEventListener2 、 anotherEventListener 、 pageEventListener1
        }
      }
    })
    ```
    ---
19. [指南-自定义组件-behaviors示例1](https://developers.weixin.qq.com/s/Yq4RqCm87thO)   
20. [指南-自定义组件-behaviors示例2](https://developers.weixin.qq.com/s/CI5omDmT7khB)   
    (1) `behaviors`用于组件间代码共享的特性，类似于`mixins`   
    (2) `behaviors`和组件同名字段的覆盖和组合规则：   
      * 同名的属性和方法，组件会覆盖`behaviors`，后面的会覆盖前面的，父类会覆盖子类
      * 同名的数据字段，对象类型会合并，其他数据覆盖规则为组件 > `父 behavior` > `子 behavior` 、 `靠后的 behavior` > `靠前的 behavior`
      * 生命周期函数不会互相覆盖，执行顺序组件 < `父 behavior` < `子 behavior` 、 `靠后的 behavior` < `靠前的 behavior`
    ---
21. [指南-自定义组件-组件间关系示例1](https://developers.weixin.qq.com/s/0kfvzKm56NZy)   
22. [指南-自定义组件-组件间关系示例2](https://developers.weixin.qq.com/s/LFEVaqmh6zYU)   
23. [指南-自定义组件-数据监听器示例1](https://developers.weixin.qq.com/s/FUZF9ams7g6N)   
24. [指南-自定义组件-纯数据字段示例1](https://developers.weixin.qq.com/s/DKWiBXmb7jaB)   
25. [指南-自定义组件-抽象节点示例1](https://developers.weixin.qq.com/s/ztPzoImW7E7P)   
    (1) 抽象节点的wxml:
    ```html
    <!-- selectable-group.wxml -->
    <view wx:for="{{labels}}">
      <label>
        <selectable disabled="{{false}}"></selectable>
        {{item}}
      </label>
    </view>
    ```
    (2) 抽象节点声明:
    ```js
    {
      "componentGenerics": {
        "selectable": true
      }
    }
    ```
    (3) 使用抽象节点:
    ```html
    <selectable-group generic:selectable="custom-radio" />
    <selectable-group generic:selectable="custom-checkbox" />
    ```
26. [指南-自定义组件-自定义组件扩展示例1](https://developers.weixin.qq.com/s/STePQRmH7Q5H)   
27. [指南-自定义组件-自定义组件扩展示例2](https://developers.weixin.qq.com/s/WaqPbxmN7E1j)   
28. [指南-硬件能力-蓝牙示例1](https://developers.weixin.qq.com/s/OF4Y9Gme6rZ4)   
    ArrayBuffer和DataView，[js中的数据操作](https://zhuanlan.zhihu.com/p/97768916)


    

### 开放文档笔记
1. 生命周期    
  App生命周期 `onLaunch`-`onShow`-`onHide `  
  Page生命周期 `onLoad`-`onShow`-`onReady`-`onHide`-`OnUnload`   
2. 事件对象   
  `target`和`currentTarget`的区别，`currentTarget`为当前事件所绑定的组件，而`target`则是触发该事件的源头组件      
  `target`的`dataset`属性是当前组件上由`data-`开头的自定义属性组成的集合   
3. 事件   
  捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。
4. 小程序更新机制
  每次冷启动时，都会检查是否有更新版本，如果有更新会异步下载新版本等下次启动时更新，如果想要马上应用最新版本可以使用[wx.getUpdateManager](https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.getUpdateManager.html)API进行处理。
5. Component构造器
    ```js
    Component({
      behaviors: [],
      properties: {
        myProperty: { // 属性名
          type: String,
          value: ''
        },
        myProperty2: String // 简化的定义方式
      },
      data: {}, // 私有数据，可用于模板渲染
      lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () { },
        moved: function () { },
        detached: function () { },
      },
      // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
      attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
      ready: function() { },
      pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () { },
        hide: function () { },
        resize: function () { },
      },
      methods: {
        onMyButtonTap: function(){
          this.setData({
            // 更新属性和数据的方法与更新页面数据的方法类似
          })
        },
        // 内部方法建议以下划线开头
        _myPrivateMethod: function(){
          // 这里将 data.A[0].B 设为 'myPrivateData'
          this.setData({
            'A[0].B': 'myPrivateData'
          })
        },
        _propertyChange: function(newVal, oldVal) {

        }
      }
    })
    ```
6. 组件间通信和事件   
    (1) 数据绑定，用于父组件向自组件指定属性设置数据   
    (2) 事件，用于子组件向父组件传递数据   
    (3) 父组件可以通过`selectComponent`方法获取子组件示例对象，可以调用子组件中的任意数据和方法   
    (4) 如果需要自定义`selectComponent`返回的数据，可使用内置的`behavior:wx://component-export`
    ```js
    // 自定义组件 my-component 内部
    Component({
      behaviors: ['wx://component-export'],
      export() {
        return { myField: 'myValue' }
      }
    })
    ```
    ```html
    <!-- 使用自定义组件时 -->
    <my-component id="the-id" />
    ```
    ```js
    // 父组件调用
    const child = this.selectComponent('#the-id') // 等于 { myField: 'myValue' }
    ```
7. 组件生命周期   
    ```js
    Component({
      lifetimes: {
        attached: function() {
          // 在组件实例进入页面节点树时执行
        },
        detached: function() {
          // 在组件实例被从页面节点树移除时执行
        },
      },
      // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
      attached: function() {
        // 在组件实例进入页面节点树时执行
      },
      detached: function() {
        // 在组件实例被从页面节点树移除时执行
      },
      // ...
    })
    ```
    (1) 组件实例刚被创建好时，触发`created`生命周期函数。   
    (2) 组件完全初始化完毕，进入页面节点树后，`attached`生命周期函数被触发。   
    (3) 当组件离开页面节点树后，`detached`生命周期函数被触发。   
8. 组件所在页面生命周期   
    ```js
    Component({
      pageLifetimes: {
        show: function() {
          // 页面被展示
        },
        hide: function() {
          // 页面被隐藏
        },
        resize: function(size) {
          // 页面尺寸变化
        }
      }
    })
    ```
9. 内置Behaviors   
  引用内置Behavior获取内置组件的一些行为：
    ```js
    Component({
      behaviors: ['wx://from-field']
    })
    ```
10. git设置ssh后需要将remote url设置为git开头的地址，https开头的只能使用用户名和密码登陆  

  