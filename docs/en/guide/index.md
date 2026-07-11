---
title: Introduction
---

# A clear workspace for complex data relationships

`web-pdm` is a lightweight React component for displaying entity-relationship diagrams. It turns model metadata into an interactive canvas with model navigation, relationship edges, layouts, zoom controls and image export.

## Why an ER workspace?

An ER diagram gives product, domain and engineering teams a shared view of the same system. It is useful when reviewing database schemas, discussing domain boundaries, estimating a feature or explaining how data moves between modules.

## Designed to be embedded

The package is a component rather than a hosted modeling service. Your application owns the model data, callbacks, translations and surrounding UI. You can use the default lightweight controls or replace them through the component adapters.

## Rendering approach

The current graph layer uses the G6 4.8 compatibility implementation. Canvas rendering keeps the workspace responsive when a schema contains many models and relationships, while React remains responsible for navigation and controls. G6 5 migration is tracked as a separate compatibility project.

Continue with [Getting started](/guide/getting-started) or open the [complete example](/demo/).
