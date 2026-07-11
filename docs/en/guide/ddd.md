---
title: Model-driven front-end development
---

# Model-driven front-end development

Complex applications are easier to reason about when state is modeled as a graph instead of deeply nested trees. Normalized stores preserve identity, avoid duplicated records and make relationships explicit—the same strengths offered by a relational schema.

An ER diagram can therefore be more than database documentation. It can act as a shared design surface for domain objects, API contracts and client-side state. Teams can review boundaries and references before implementation, then keep the same metadata available to development tools.

`web-pdm` provides the visualization layer for that workflow. Applications remain responsible for schema ownership, editing rules and code generation.

## Practical guidance

1. Give every model a stable identifier.
2. Keep references explicit through field metadata.
3. Separate domain labels from technical names.
4. Treat generated output as a projection of the model, not the source of truth.
5. Add product-specific validation before enabling visual editing.
