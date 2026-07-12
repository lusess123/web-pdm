---
title: Introduction
---

# A clear workspace for complex data relationships

`web-pdm` is a lightweight, embeddable React ER diagram component and an ongoing open-source effort to build an online PowerDesigner. It turns model metadata into an interactive Canvas with model navigation, field relationships, automatic layouts, zooming, a minimap and image export.

![web-pdm ER diagram](../../assets/erd.jpeg)

## What is an ER diagram?

E-R is short for the Entity–Relationship Approach, an effective way to describe the conceptual structure of the real world. An ER diagram is the visual expression of that approach.

Whether a team uses conventional database-driven development, Domain-Driven Design, a model-driven low-code platform, or a master-data-driven APaaS platform, an ER diagram provides a shared visual perspective on the business.

## Why use an ER workspace?

### Business design ≈ model design ≈ database design

A mature APaaS or low-code platform separates technical complexity from business complexity. Model metadata is an important input to the system, and every project brings different models and fields. The number of models, their relationships and their boundaries therefore provide a useful measure of business complexity.

Large and complex projects often use DDD to design the business, with the domain model as a central artifact. The people who understand and design that model are frequently domain experts, while another group implements the functionality. A visual ER diagram can serve as a vital intermediate artifact between them.

In small and medium projects, delivery is usually more direct, so view objects (VO), business objects (BO) and data objects (DO) tend to converge. In that setting the ER diagram also acts as a database design tool.

During a project kick-off or design review, teams commonly gather around an ER diagram. For many smaller projects, once that diagram is agreed, the core business logic and the implementation effort become much clearer. Experienced engineers describe this as “controlling the database design before coding starts.”

### A customized ER diagram is more valuable

No APaaS or low-code platform that succeeds in production is completely generic. Platform work rarely starts from zero; it abstracts an organization's existing technology stack, delivery process and business experience, and inevitably reflects established domains. The combination of technology and business context is what makes the platform valuable and difficult to replace.

Every organization develops familiar concepts and resources that reduce communication cost. Because the model sits at the center of such a platform, the ER diagram is the natural stage on which to display them. Extending a generic ERD with domain meaning gives experts a place to express and create the business visually.

### An online PowerDesigner

PowerDesigner is a classic ER design tool. In addition to solid fundamentals, its support for Chinese metadata influenced many database-design workflows in China, while many tools developed elsewhere historically offered less support for that context.

Traditional PowerDesigner workflows are primarily Windows-based. macOS users and cross-platform teams have long lacked an equally convenient alternative. A browser-based ER tool that can be shared across platforms is therefore important both as an embeddable product component and as the original product goal of web-pdm.

## How is it built?

### Choosing Canvas over SVG

The following comparison preserves the conclusions used in the project's original technology selection:

| Canvas                                                  | SVG                                                             |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| Resolution-dependent                                    | Resolution-independent                                          |
| Low-level event handling needs an engine abstraction    | Every graphic element can receive events                        |
| Text and accessibility require additional work          | Text and DOM semantics are more natural                         |
| Can export PNG or JPEG output                           | High complexity and large DOM trees slow rendering              |
| Well suited to image-heavy scenes with frequent redraws | Well suited to vector interfaces with a controlled object count |

Canvas is closer to a low-level rendering API than SVG and is also a path toward WebGL, leaving more room for performance work. An online ER diagram comparable to PowerDesigner must be able to display hundreds or thousands of models, which made Canvas the project's deliberate choice from the beginning.

Working directly with the low-level Canvas API would make development unnecessarily slow. G6 supplies graph data, layout, interaction and rendering abstractions that close this gap. The current release uses G6 5 behind a dedicated runtime adapter for asynchronous lifecycle management, custom nodes, named ports and layouts.

### Designed to be embedded

web-pdm is a component rather than a hosted modeling service. The host application continues to own model data, callbacks, translations and surrounding UI. It can use the lightweight default controls or replace them through component adapters.

The public model and event contracts remain compatible wherever possible. G6 itself is kept behind the component boundary, so host applications do not have to rewrite business code for every G6 major-version change.

Continue with [Getting started](/guide/getting-started), [Configuration](/config/) and [G6 practices and performance](/guide/next), or open the [complete example](/demo/).
