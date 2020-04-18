### 项目配置及修改项
1. 使用开发工具push代码，需要在Source Control-Setting-Network and Auth的Auth部分选择Use username and password,并输入用户和密码
2. index.wxml代码中的mode为cover？搜索之后说是遗留代码问题，不过现在还没改过来
```js
//aspectFit
<image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="aspectFit"></image>
``` 
3. index.js里面的getUserInfo方法和系统方法重名，改为onGetUserInfo
