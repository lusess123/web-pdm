---
legacy: /ddd
---

# 模型驱动前端开发

前端状态管理是老生常谈的话题，也许不同的人在不同时期的认识和感受都不一样，在关于说说下个版本的想法之前，首先我们来谈谈，我心目中认为最好的前端状态管理方案是什么呢？

redux 有一个最佳实践就是要 data normalization ，简单的说就是拍平数据存储，尽量缩短数据的嵌套层次。这个其实是遵循关系数据的范式设计。

巧合的是，另外一个的状态管理框架 mobx 作者官方博客里面直接就这么说：

> The second important idea behind MobX is that for any app that is more complex than TodoMVC, you will often need a data graph, instead of a normalized tree, to store the state in a mentally manageable yet optimal way. Graphs enable referential consistency and avoid data duplication so that it can be guaranteed that derived values are never stale.
> MobX 背后的第二个重要思想是，对于任何比 TodoMVC 更复杂的应用，您通常需要一个数据图，而不是规范化的树，以一种精神上可管理但最佳的方式存储状态。图形支持引用一致性，并避免数据重复，以便保证派生值永远不会过时。
>> (来源：https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254)

有意思的是，facebook 内部 react 团队最新推出的前端状态管理库 Recoli 也是基于关联图形的

  <img src='https://pic1.zhimg.com/80/v2-acc79877c4337e90c1d107c7ffbddeb9_1440w.jpg' /> 
  
  <img  src="https://pic3.zhimg.com/80/v2-821e9e52949a3004b5eab05f855deefb_1440w.jpg" />

redux, mobx, recoli 的实践都指向这个启示，在复杂的应用里面，设计状态的结构和存储就应该象图形一样，贴近问题域模型，遵循关系数据的范式设计，这样可以尽可能保持引用一致性，避免数据重复。

而 ORM 可以让数据库 schema 变成对象模型表的外键关联就转换成对象间的引用，这样看起来复杂前端状态管理 跟后端对于复杂业务系统 “屠龙刀” DDD（领域模型驱动开发） 的理念不谋而和。

   <img src="https://pic1.zhimg.com/80/v2-a6c752edeb8ce3f65c0e059650f57daa_1440w.jpg"  />

这样前端的状态结构可以通过一张 ER 呈现出来，就象我们在一个业务系统之前会设计好 ER 图，通过这张 ER 图，可以很直观的呈现业务逻辑特征和复杂度。

我们甚至可以直接在 ER 图操作进行设计调整和修改，通常使用的工具是 power-designer。

Web-pdm 要做成在线版本的 power-designer 工具。同时，根据上述理论，一个应用场景是，他可以成为某个前端状态管理库（取个名字就叫 boxer）的配套设计工具。

boxer 的设计也是站在巨人的肩膀之上，调研了特性相近的库 redux-orm 和 mobx-state-tree , 最终选择了 mobx-state-tree 做为轮子 ,一个很重要的原因是类型支持得更好。boxer 的设想是对 mobx-state-tree 的一层封装。

Web-pdm 做为一个 boxer 的配套工具 ，其开发也是通过 boxer 来完成的，本身前端的状态管理足够复杂， 可以做为 boxer 的一个案例和最佳实践。
在 Web-pdm 页面上设计好模型 和 关联关系后， 可以一键生成 boxer（mobx-state-tree） 的模型定义代码（以后甚至可以做到双向生成），然后对于模型可以增加 action 让模型充血（ rich domain model）
