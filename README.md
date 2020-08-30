
# 介绍

一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner

<img target="_bank" src='https://raw.githubusercontent.com/lusess123/web-pdm/master/doc/web-pdm-pre.png'>


# 缘起

[ER图的设计与实现](https://www.yuque.com/antv/g6-blog/nbaywp)


# 在线体验


[定制版Demo](http://zyking.xyz:5080/demo/ "定制版Demo")

[基本版Demo](http://zyking.xyz:5002/ "基本版Demo")

# 下个版本的想法

  我们知道前端状态管理是老生常谈的话题，也许不同的人在不同时期的认识和感受都不一样，在关于说说下个版本的想法之前，首先我们来谈谈，我心目中认为最好的前端状态管理方案是什么呢？

  redux有一个最佳实践就是要 data normalization ，简单的说就是拍平数据存储，尽量缩短数据的嵌套层次。这个其实是遵循关系数据的范式设计。

  巧合的是，另外一个的状态管理框架mobx作者官方博客里面直接就这么说：

   MobX 背后的第二个重要思想是，对于任何比 TodoMVC 更复杂的应用，您通常需要一个数据图，而不是规范化的树，以一种精神上可管理但最佳的方式存储状态。图形支持引用一致性，并避免数据重复，以便保证派生值永远不会过时。

   在复杂的应用里面，设计状态的结构和存储就应该象图形一样，贴近问题域模型，遵循关系数据的范式设计，这样可以尽可能保持引用一致性，避免数据重复。
 
   ORM 可以让数据库schema 变成对象模型表的外键关联就转换成对象间的引用

   这样前端的状态结构可以通过一张ER呈现出来，就象我们在一个业务系统之前会设计好ER 图，通过这张ER图，可以很直观的呈现业务逻辑特征和复杂度。

   我们甚至可以直接在ER图操作进行设计调整和修改，通常使用的工具是power-designer。

   Web-pdm 要做成在线版本的power-designer 工具。同时，根据上述理论，一个应用场景是，他可以成为某个前端状态管理库（取个名字就叫 boxer）的配套设计工具。

   boxer的设计也是站在巨人的肩膀之上，调研了特性相近的库redux-orm 和 mobx-state-tree , 最终选择了mobx-state-tree 做为轮子 ,一个很重要的原因是类型支持得更好。boxer 的设想是对mobx-state-tree的一层封装。

    Web-pdm 做为一个boxer  的配套工具 ，其开发也是通过boxer 来完成的，本身前端的状态管理足够复杂， 可以做为boxer的一个案例和最佳实践。在Web-pdm 页面上设计好模型 和 关联关系后， 可以一键生成boxer（mobx-state-tree） 的模型定义代码（以后甚至可以做到双向生成），然后对于模型可以增加action 让模型充血（ rich domain model）


# 快速启动

npm i 

npm run watch

# 特性


## next

- [ ]  模型在线新增和编辑
- [ ]  导出SQL语句


## 0.0.3

- [x]  升级antd 从V3到V4
- [x]  美化布局样式
- [x]  .PDM 文件上传按钮调整到工具栏

## 0.0.2

- [x] 状态管理从 DVA 改成轻量级的unstated-next

## 0.0.1

- [x]  typescript npm 源码发布
- [x]  DVA 状态管理
- [x]  支持 .PDM 文件上传



# 感谢

[G6](https://g6.antv.vision/zh/)

[DVA](https://dvajs.com/guide/)

[pdm-to-json](https://github.com/shermam/pdm-to-json)
