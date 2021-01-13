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
1. 