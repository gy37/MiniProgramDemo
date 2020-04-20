### 项目配置及修改项
1. 使用开发工具push代码，需要在Source Control-Setting-Network and Auth的Auth部分选择Use username and password,并输入用户和密码
2. index.wxml代码中的mode为cover？搜索之后说是遗留代码问题，不过现在还没改过来
```js
//aspectFit
<image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="aspectFit"></image>
``` 
3. index.js里面的getUserInfo方法和系统方法重名，改为onGetUserInfo
4. sitmap.json可配置页面是否被索引，搜索时是否被微信爬虫爬到页面   
    (1) 默认为allow，*所有页面都可以被索引
      ```json
      "rules": [
          {
            "action": "allow",
            "page": "*"
          }
        ]
      ```
    (2) 某个页面不被索引
      ```json
      "rules": [
          {
            "action": "disallow",
            "page": "pages/logs/logs"
          },
          {
            "action": "allow",
            "page": "*"
          }
        ]
      ```
    (3) 同时包含a，b两个参数的页面会被索引，其他不会
      ```json
      "rules": [
          {
            "action": "allow",
            "page": "path/to/page",
            "params": ["a", "b"],
            "matching": "inclusive"
          }, 
          {
            "action": "disallow",
            "page": "*"
          }
        ]
      ```
5. logs.wxml页面报错Now you can provide attr `wx:key` for a `wx:for` to improve performance.   
  wx:key用于标识每个item,   
  当数据改变触发渲染层重新渲染时，会校正带有key的组件，会重新排序而不是重新创建，提高渲染效率,   
  在wx:for和wx:for-item之间加wx:key，值设置为*this代表当前item自身即可
6. 开发工具中Side Bar里面push代码会一直等待，push不成功，使用Tool Bar里面的Source Control可以
7. [微信开放文档][documents]和[小程序开发指南][guideline]，虽然有些东西是重复的，但是建议还是都看一遍。   
  原来[小程序开发指南][guideline]是一本书，详细介绍如何进行小程序开发，按顺序应该先看一遍[微信开放文档][documents]的指南部分，然后再来详细看一遍这本书。

  [comment]:#markdown添加注释语法[comment]：空格#
  [comment]:#markdown参考链接和正文之间要加空行
  [documents]: https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/
  [guideline]: https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0008aeea9a8978ab0086a685851c0a

8. 生命周期    
  App生命周期onLaunch-onShow-onHide   
  Page生命周期onLoad-onShow-onReady-onHide-OnUnload   
9. 事件对象   
  target和currentTarget的区别，currentTarget为当前事件所绑定的组件，而target则是触发该事件的源头组件      
  target的dataset属性是当前组件上由data-开头的自定义属性组成的集合   