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
