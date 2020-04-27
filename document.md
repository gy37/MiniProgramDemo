### 开放文档中的示例
1. [指南-起步-小程序简介中的示例](https://github.com/wechat-miniprogram/miniprogram-demo)
2. [指南-小程序框架中的示例](https://developers.weixin.qq.com/s/l0gLEKmv6gZa)
3. [指南-小程序框架-视图层-事件系统中的示例](https://developers.weixin.qq.com/s/boDQoKmu7M7G)
4. [指南-小程序框架-视图层-事件系统-WXS响应事件中的示例](https://developers.weixin.qq.com/s/L1G0Dkmc7G8a)
5. [指南-小程序框架-视图层-简易双向绑定中的示例](https://developers.weixin.qq.com/s/8jXvobmV7vcj)
6. [指南-小程序框架-视图层-动画中的示例1](https://developers.weixin.qq.com/s/oHKxDPm47h5k)
7. [指南-小程序框架-视图层-动画中的示例2](https://developers.weixin.qq.com/s/P73kJ7mi7UcA)
8. [指南-小程序框架-视图层-动画中的示例3](https://developers.weixin.qq.com/s/994o8jmY7FcQ)
9. [指南-小程序框架-视图层-动画中的示例4](https://developers.weixin.qq.com/s/cRTvdPmO7d5T)

### 开放文档笔记

1. 生命周期    
  App生命周期 `onLaunch`-`onShow`-`onHide `  
  Page生命周期 `onLoad`-`onShow`-`onReady`-`onHide`-`OnUnload`   
2. 事件对象   
  `target`和`currentTarget`的区别，`currentTarget`为当前事件所绑定的组件，而`target`则是触发该事件的源头组件      
  `target`的`dataset`属性是当前组件上由`data-`开头的自定义属性组成的集合   
3. 事件   
  捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。