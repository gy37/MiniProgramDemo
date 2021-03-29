### 开发指南中的示例

### 开发指南笔记
一、WXML模版
1. 在app.json中添加pages/wxml/index，并保存文件，即可在pages目录下，自动生成指定的文件夹
2. wxml通过{{变量名}}来绑定wxml文件和对应的js文件中data中定义的对象属性
3. 组件的属性绑定时，需要用双引号包裹起来`<text> data-test="{{test}}"</text>`
4. 没有被定义的变量或者被设置为undefined的变量不会被同步到wxml中
5. 可以在{{}}里面进行简单的逻辑运算
6. wxml中，使用wx:if="{{condition}}"来判断是否需要渲染改代码块，使用wx:elif和wx:else来添加一个else块
7. 在组件上使用wx:for属性绑定一个数组，可以使用数组中数据重复渲染该组件。默认当前下标为index，当前项为item
8. 使用wx:for-index和wx:for-item来指定数组当前下标和变量名
9. wx:key指定列表中项目的唯一标示，渲染时会动态更新而不是重新创建，提交渲染效率。可以使用两种方式，1字符串，代表item的某个property，该property的值需要为列表中的唯一字符串；2关键字*this，代表item本身，该item需要是唯一的字符串或者数字
10. 使用template定义模版，然后在不同的地方调用，使用name属性作为模版的名字。引用时使用is属性，声明需要使用的模版，然后将模版所需要的data传入
11. import之后可以使用引用文件中的template，只能使用引用文件中的template，不能递归引用；include可以将目标文件中出来template和wxs外的整个代码引入，相当于是拷贝到include的位置
12. 所有wxml标签都支持的属性：（*markdown表格前面需要一个空行* ）

    |属性名|类型|描述|注释|
    |----|----|----|----|
    |id|String|组件的唯一标示|整个页面唯一|
    |class|String|组件的样式类|在对应的wxss中额定义的样式类|
    |style|String|组件的内联样式|可以动态设置的内联样式|
    |hidden|Boolean|组件是否显示|所有组件默认显示|
    |data-*|Any|自定义属性|组件的属性|
    |bind*/catch*|EventHandler|组件的事件|触发事件时，会发送给事件处理函数|  
    
二、WXSS样式
1. rpx单位和px的换算关系，1rpx=1px
2. 样式引用，`@import './test_0.wxss'`
3. 元素选择器

    |类型|选择器|样例|
    |----|----|----|
    |类选择器|.class|.intro|
    |id选择器|#id|#firstname|
    |元素选择器|element|view checkbox|
    |伪元素选择器|::after|view::after|
    |伪元素选择器|::before|view::before|

    元素选择器 优先级1   
    类选择器 优先级10   
    id选择器 优先级100   
    内联样式 优先级1000   
    !important 优先级∞   

三、JavaScript脚本
1. 通过module.exports或者exports对外暴露接口；通过require引用
2. 在文件中声明的变量和函数只在该文件中有效；当需要使用全局变量时，需要通过全局函数getApp()获取全局的实例，并设置相关属性来实现

四、渲染层和逻辑层
1. WXML模板和WXSS样式工作在渲染层，JS脚本工作在逻辑层。
2. 渲染层和数据相关；逻辑层负责产生、处理数据；逻辑层通过page实例的setData方法传递数据到渲染层；
3. 渲染层的界面使用webview进行渲染；逻辑层采用jscore线程运行js脚本；两个线程的通信会经过微信客户端做中转
4. 小程序中的wxml也是一个Dom树的结构，也可以通过js对象来表达Dom树，当数据变化时，会先比较js对象，把js对象前后差异的部分应用到dom树上，达到更新页面的目的。

五、程序与页面
1. 小程序生命周期
onLaunch: 初始化完成时，会触发
onShow: 小程序启动，或从后台进入前台显示时，会触发
onHide: 小程序从前台进入后台，会触发
onError: 小程序发生脚本错误，或者发生API调用失败时，会触发
2. 所有js都在同一个jscore线程中，所以使用定时器时要注意，再跳转其他页面时要自己清理
3. 页面的生命周期
onLoad
onReady
onShow
onHide
onUnload
4. 页面的用户行为
onPullDownRefresh：下拉刷新
onReachBottom：上拉触底
onPageScroll：页面滚动
onShareAppMessage：用户转发
5. 页面的数据
通过this.setData把数据传递给渲染层，更新页面；
setData异步调用，可以设置回调；
每次只设置需要改变的最小单位数据；
直接修改page实例的data属性，不调用setData方法是无法改变页面状态的，还会导致数据不一致；（类似react中的setState）
6. 页面跳转和路由
小程序页面以页面栈的形式存在，最大10层；
wx.navigateTo({url: 'pageD'})相当前页面栈中推入一个页面；
wx.navigateBack()推出当前页面栈最顶层的页面；
wx.redirectTo({url: 'pageE'})替换当前页面变成pageE；
wx.switchTab({url: 'pageF'})切换tab，原来的页面栈会被清空，除了已被声明为Tabbar的页面
wx.reLaunch({url: 'pageH'})重启小程序，并打开指定页面

六、组件
1. 组件类似控件，页面的基础，一个个的组件拼接组合成页面
2. 所有组件公共属性   

    |属性名|类型|描述|其他说明|
    |---|---|---|---|
    |id|String|组件的唯一标示|整个页面唯一|
    |calss|String|组件的样式类|在wxss中定义的样式类|
    |style|String|组件的内联样式|可以通过数据绑定进行动态设置的内联样式|
    |hidden|Boolean|组件是否显示|默认显示|
    |data-*|Any|自定义属性|组件上触发的事件，会发送给事件处理函数|
    |bind/catch|EventHandler|事件|事件处理|

七、微信API
1. wx.on*开头的方法用来监听事件发生的API接口，可接受一个callback函数作为参数。
2. 如未特殊约定，多数API接口为异步接口，都接受一个object作为参数。
3. API的object参数一般有success，fail，complete三个回调来接收接口调用结果。
4. wx.get*开头的API是获取宿主环境数据的接口。
5. wx.set*开头的API是写入数据到宿主环境的接口。

八、事件
1. 把用户在渲染层的行为反馈，以及组件的部分状态反馈，抽象为渲染层传递给逻辑层的事件。
2. 事件类型：touchstart, touchmove, touchcancel, touchend; tap, longpress, long tap; transitionend, animationstart, animationiteration, animationend
3. 事件对象的属性

    |属性|类型|说明|
    |---|---|---|
    |type|String|事件类型|
    |timeStamp|Integer|页面打开到触发事件经过的毫秒数|
    |target|Object|触发事件的组件的一些属性值集合|
    |currentTarget|Object|当前组件的一些属性值集合|
    |detail|Object|额外的信息|
    |touches|Array|触摸事件，当前停留在屏幕中的触摸点信息的数组|
    |changedTouches|Array|触摸事件，当前变化的触摸点信息的数组|
    
    target为触发该事件的源头组件，currentTarget为当前事件所绑定的组件
4. capture-bind*捕获阶段，从外到内，从父视图到子视图；
bind*冒泡阶段，从内到外，从子视图到父视图；
capture-catch*事件绑定会阻止冒泡事件向上冒泡

九、兼容
1. wx.getSystemInfo, wx.getSystemInfoSync获取手机系统信息。
2. wx.canIUse, 判断接口或者组件在当前手机是否可用

十、开发流程介绍
1. 绘制静态页面和跳转关系
2. 使用WXML+WXSS还原设计稿，把界面的元素和视觉细节完成
3. 梳理每个页面的数据部分，完成JS中的逻辑

十一、 Flex布局
1. 传统网页开发，使用的是盒模型，通过display:inline|block|inline-block, position, float来实现布局。
2. 使用flex布局的元素，简称为容器，使用container表示容器的类名；容器内的元素简称为项目，用item表示项目的类名。
3. flex不但是一个属性，还包含了一套新的属性集，属性集包括设置容器盒设置项目两部分。
4. 容器的属性：
    ```
    display: flex;
    flex-direction: row|row-reverse|column|column-reverse 设置坐标轴来设置项目排列方向
    flex-wrap: nowrap|wrap|wrap-reverse 设置项目多行排列及多行时的换行方向
    justify-content: flex-start|flex-end|center|space-between|space-around|space-evenly 设置项目在主轴方向上的对齐方式，及分配项目之间盒周围多余的空间
    align-items: stretch|center|flex-end|baseline|flex-start 项目在交叉轴方向上的对齐方式
    align-content: stretch|flex-start|center|flex-end|space-between|space-around|space-evenly 多行排列时，设置行在交叉轴方向上的对齐方式，及分配周围多余的空间
    ```
5. 项目的属性：
    ```
    order: 0|<integer> 设置项目沿主轴方向上的排列顺序，数值越小排列越靠前
    flex-shrink: 1|<number> 当项目在主轴方向溢出时，通过设置收缩因子来压缩项目适应容器
    flex-grow: 0|<number> 当项目在主轴方向上还有剩余空间时，通过设置项目扩张因子进行剩余空间的分配
    flex-basis: auto|<length> flex-basis和width或者height属性优先级
    flex: none|auto|@flex-grow @flex-shrink @flex-basis 是简写形式，none表示0 0 auto，auto表示1 1 auto
    align-self: auto|flex-start|flex-end|center|baseline|stretch 设置项目在行中交叉轴方向上的对齐方式，用于覆盖容器的align-items
    ```
6. 默认水平方向是主轴，垂直方向是交叉轴
7. 项目在主轴上排列，排满之后在交叉轴方向换行，交叉轴垂直于主轴
8. justify-content: flex-start|flex-end|center项目之间不留空隙，space-between|space-around|space-evenly项目之间又间距
9. align-items: stretch拉伸项目，center|flex-end|baseline|flex-start项目对齐的位置
10. align-content: stretch拉伸各行项目至填满交叉轴，flex-start|flex-end|center行间不留空隙，space-between|space-around|space-evenly行间又间距
11. flex-shrink项目收缩因子，项目总和超出容器宽度时，总权重=项目宽度* 收缩因子 的和；项目实际宽度=项目宽度-溢出宽度* 项目宽度* 收缩因子/总权重；当项目的收缩因子相加小于1时，参与计算的溢出空间=溢出空间* 收缩因子的和/1
12. flew-grow项目扩张因子，项目实际宽度=项目宽度+剩余空间*扩张因子/扩张因子之和；当项目的扩张因子相加小于1时，剩余空间按除以1进行分配，项目实际宽度=项目宽度+剩余空间 *扩张因子
13. flex-basis优先级高于width和height，有主轴方向决定是替换width还是height；当其中一个属性为auto时，非auto属性的优先级更高
14. align-self默认属性值为auto，继承容器的align-items值，当容器没有设置align-items时，属性值为stretch

[小程序文档中的flex讲解](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=00080e799303986b0086e605f5680a)

十二、界面常见的交互反馈 

十三、发起HTTPS网络通信   
1. 网络请求示例
    ```
    wx.request({
        url: 'https://test.com/getinfo?id=1&version=1.0.0',
        data: {id: 1, version: '1.0.0'},
        success: function(res) {
            console.log(res);
        }
    })
    ```
2. 常用网络请求格式
    ```     
    requestTest: function () {
      if (this.data.hasClick) {
        return;
      }
      this.setData({
        hasClick: true
      });
      wx.showLoading({
        title: 'Loading',
      })
      wx.request({
        url: 'https://test.com/getinfo',
        method: 'POST',
        header: {'content-type': 'application/json'},
        data: {},
        success: function (res) {
          if (res.statusCode === 200) {
            console.log(res.data);
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '系统错误',
          })
        },
        complete: function (res) {
          wx.hideLoading();
          this.setData({
            hasClick: false
          });
        }
      })
    }
    ```

十四、微信登录   

十五、本地数据缓存
1. wx.getStorage/wx.getStorageSync读取本地缓存；wx.setStorage/wx.setStorageSync写数据到缓存

十六、设备能力
1. wx.scanCode调用微信扫一扫功能
2. wx.getNetworkType获取网络状态；wx.onNetworkStatusChange监听网络状态变化

十七、协同工作
1. 