### 项目配置及修改项
1. 使用开发工具push代码，需要在Source Control-Setting-Network and Auth的Auth部分选择Use username and password,并输入用户和密码
2. index.wxml代码中的mode为cover？搜索之后说是遗留代码问题，不过现在还没改过来
```js
//aspectFit
<image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="aspectFit"></image>
``` 
3. index.js里面的getUserInfo方法和系统方法重名，改为onGetUserInfo
4. sitmap.json可配置页面是否被索引，搜索时是否被微信爬虫爬到页面

    4.1 默认为allow，*所有页面都可以被索引
      ```json
      "rules": [
          {
            "action": "allow",
            "page": "*"
          }
        ]
      ```

    4.2 某个页面不被索引
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

    4.3 同时包含a，b两个参数的页面会被索引，其他不会
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