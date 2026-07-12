---
title: Model-driven front-end development
---

# Model-driven front-end development

> This page preserves the project's complete early reasoning about Redux, MobX, Recoil (spelled “Recoli” in the historical Chinese text), MobX State Tree and the proposed boxer library. The status of those libraries may have changed, but the idea of expressing complex state as a relationship graph remains part of web-pdm's foundation.

Front-end state management is a long-running topic, and people naturally see it differently at different stages of their work. Before discussing the ideas for the next release, it is useful to explain what the project originally considered the best shape for front-end state.

One Redux best practice is data normalization: flatten stored data and keep nesting as shallow as possible. That approach follows many of the same principles as normalized relational data.

The author of MobX made a closely related point in an official article:

> The second important idea behind MobX is that for any app that is more complex than TodoMVC, you will often need a data graph, instead of a normalized tree, to store the state in a mentally manageable yet optimal way. Graphs enable referential consistency and avoid data duplication so that it can be guaranteed that derived values are never stale.
>
> Source: [Becoming fully reactive: an in-depth explanation of MobX](https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254)

In other words, applications more complex than TodoMVC often need a data graph rather than a normalized tree. A graph keeps the state understandable and efficient, preserves referential consistency, avoids duplicated data, and prevents derived values from becoming stale.

Recoil, introduced by Facebook's React team, also represented front-end state as a graph:

<img src="https://pic1.zhimg.com/80/v2-acc79877c4337e90c1d107c7ffbddeb9_1440w.jpg" alt="Recoil state graph" />

<img src="https://pic3.zhimg.com/80/v2-821e9e52949a3004b5eab05f855deefb_1440w.jpg" alt="Recoil dependency graph" />

The practices around Redux, MobX and Recoil all pointed toward the same insight. In a complex application, state structure and storage should resemble a graph, stay close to the problem-domain model and follow relational normalization principles. This makes it easier to preserve references and avoid duplicated data.

An ORM turns a database schema into an object model: foreign-key relationships between tables become references between objects. From that perspective, complex front-end state management and DDD—the powerful tool used for complex business systems on the back end—arrive at remarkably similar ideas.

<img src="https://pic1.zhimg.com/80/v2-a6c752edeb8ce3f65c0e059650f57daa_1440w.jpg" alt="Domain model relationships" />

The front-end state structure can then be presented as an ER diagram. Just as a team designs an ER diagram before building a business system, the diagram makes the application's business characteristics and complexity visible.

The team can even adjust the design directly on the ER diagram, using tools such as PowerDesigner in traditional workflows.

web-pdm set out to become an online PowerDesigner. Based on the reasoning above, one proposed use case was to make it the companion design tool for a front-end state-management library, provisionally named **boxer**.

The boxer idea also stood on the shoulders of existing work. The project compared libraries with related goals, including redux-orm and mobx-state-tree, and selected mobx-state-tree as the proposed foundation largely because of its stronger type support. boxer would have been a focused wrapper around mobx-state-tree.

web-pdm itself was intended to be built with boxer, because its own front-end state is complex enough to serve as both a case study and a best-practice example. After designing models and relationships in web-pdm, a user could generate boxer (mobx-state-tree) model definitions with one action—and potentially support two-way generation later—then add actions to turn those models into rich domain models.

## How the current version continues the idea

boxer and one-click code generation are historical product ideas, not promises in the current public API. Today web-pdm focuses on accepting stable model metadata, displaying explicit relationships, and integrating with products through events such as `onModelDetail`, `onReload` and `onIgnoreEdge`.

This still follows the central conclusion of the original article: model metadata should be the source of truth, while the ER diagram is its visual projection. A host application can add editing policies, validation, code generation or bidirectional synchronization on top of the stable public contracts without depending directly on the internal G6 instance.
