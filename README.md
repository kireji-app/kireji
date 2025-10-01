> ### NOTE
> This node package is currently an empty placeholder for a web framework under development.
>
> Visit the working demo project [here](https://github.com/kireji-app/demo#readme).
>
> Read this documentation to get an idea of the framework's intent and features.
>
> Check back later to see if the package has been populated.

# **kireji:**<br><sup><sub>Entropy-perfect web apps</sub></sup>
kireji is a reactive full-stack web framework that uses minimal perfect hash functions (MPHFs) to achieve the information-theoretic lower bound of data compression.

An MPFH is a collision-free, duplicate-free and gap-free hash function that provides a compression solution specialized for a given data model. It assigns a unique integer to every state in the model.

Rich model data is recovered instantly from a hash and vice versa, with hashes compact enough to fit in URLs or DNS TXT records.

Applications powered by kireji feature state-complete deep linking, enabling session bookmarking, peer-to-peer data sharing without a central server, and cross-origin communication via URL.

## MVC + MPHF Architecture

kireji integrates minimal perfect hash functions (MPHFs) with the model-view-controller (MVC) paradigm by using hashes as a canonical data model.

* Each controller is a stateful component (called a <strong>part</strong>) with a dedicated hash function.
* Parts assemble like LEGO® bricks, each assembly producing a new hash function derived from its subparts.
* JavaScript's prototype chain powers compositional inheritance between parts.

## DNS-Based Namespacing

<h3><a href="https://www.ejaugust.com/0.131.3/4lbHaxsKnzRXOKxrM/"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/ejaugust/note/part.png" style="width:1.25em" alt="part icon" />&nbsp;&nbsp;<sup>Why DNS?<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sup>⟍&nbsp;</sup><sub>Further Reading</sub></sup></a></h3>

Parts in kireji are assigned unique names following DNS semantics, relating a web application's origin (e.g., www.ejaugust.com) to its individual components, for example:

```js
_.com.ejaugust
_.com.ejaugust.scroller
_.com.ejaugust.www
_.com.ejaugust.www.home
_.com.ejaugust.www.notes
```

The root part, represented by `_`, is the only global object. This allows parts to reference each other without polluting the global namespace.

The framework provides a set of premade parts like MVC abstracts and MPHF arithmetic under the domain "core.parts":

```js
_.parts.core.mix
_.parts.core.match
_.parts.core.clip
```

You can explore this organization in action by going to [www.kireji.app](https://www.kireji.app).

## Made with Vanilla JS

kireji does not import any third-party libraries, frameworks, or packages so that it can be reasoned about end-to-end as a self-contained and self-descriptive system.

## Live Applications

kireji is in alpha. To see the technology in action, check out the [demo](https://github.com/kireji-app/demo) repo.
<!--
## **Current Status**

The following milestones completed:

* Core framework functionality
* CI/CD pipeline
* MPFH for stateless deep linking and data compression
* Reactive front-end framework via MVC + MPFH
* Domain-named architecture ready for DNS integration
* In-platform part inspector
* Node.js server built-in
* Local debugging and development at localhost:3000
* Desktop operating system preview
* Ready-made stateful components with HTML and CSS, such as
  - Scroller with custom scroll-bar implementation (more customizable than the native scrollbar)
  - Color mode management that automatically computes shades from a given color palette
  - Additive parts for mutually exclusive variable assignments
  - Multiplicative parts for independent variables
  - Movie clip part for animating data models with a dedicated hash for every frame
  - Notebook - a blog template

### **Roadmap**

| Phase                                    | Status      |
| ---------------------------------------- | ----------- |
| **Minimal Perfect Hashing For Any Data** | Completed   |
| **Reacting MVC Framework**               | Completed   |
| **CI/CD Pipeline**                       | Completed   |
| **Model LTS and Versioning Strategy**    | Completed   |
| **NPM Packages and Project Generation**  | In Progress |
| **Debug Tools, Docs**                    | In Progress |
| **Operating System Concept**             | In Progress |
| **Transfinite State Space**              | Planned     |
| **Advanced DNS Integration**             | Planned     |
| **Integrated Development Environment**   | Planned     |
-->
## Status and License
[![kireji on npm](https://img.shields.io/npm/v/kireji?style=for-the-badge&labelColor=CB3837&logo=npm&logoColor=white&label=NPM+package&color=212121)](https://www.npmjs.com/kireji)
<br>[![Project Status: Alpha](https://img.shields.io/badge/status-alpha-212121?style=for-the-badge&labelColor=181717&logo=github&logoColor=white)](https://www.repostatus.org/#alpha)
<br>[![Commits](https://img.shields.io/github/commit-activity/t/kireji-app/kireji?style=for-the-badge&labelColor=181717&color=212121&logo=github&logoColor=white)](https://github.com/kireji-app/demo/commits/)
<br>[![Last Commit](https://img.shields.io/github/last-commit/kireji-app/kireji?style=for-the-badge&labelColor=181717&color=212121&logo=github&logoColor=white)](https://github.com/kireji-app/demo)
<br>[![Copyright © 2023-2025 <a href="https://www.ejaugust.com">Eric Augustinowicz</a>](https://img.shields.io/badge/2023%20--%202025-Eric_Augustinowicz-212121?labelColor=007ec6&style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk3cHgiIGhlaWdodD0iMTk3cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj4KIDxkZWZzPgogIDxtYXNrIGlkPSJtYXNrIj4KICAgPGNpcmNsZSBjeD0iOTgiIGN5PSI5OCIgcj0iOTgiIGZpbGw9IndoaXRlIiAvPgogICA8Y2lyY2xlIGN4PSI5OCIgY3k9Ijk4IiByPSI3OCIgZmlsbD0iYmxhY2siIC8+CiAgIDxjaXJjbGUgY3g9Ijk4IiBjeT0iOTgiIHI9IjU1IiBmaWxsPSJ3aGl0ZSIgLz4KICAgPGNpcmNsZSBjeD0iOTgiIGN5PSI5OCIgcj0iMzAiIGZpbGw9ImJsYWNrIiAvPgogICA8cmVjdCB4PSIxMTUiIHk9Ijg1IiB3aWR0aD0iNDUiIGhlaWdodD0iMjUiIGZpbGw9ImJsYWNrIiAvPgogIDwvbWFzaz4KIDwvZGVmcz4KIDxwYXRoIGQ9Ik0gOTgsMCBBIDk4LDk4IDAgMSAxIDk4LDE5NiBBIDk4LDk4IDAgMSAxIDk4LDAgWiIgZmlsbD0id2hpdGUiIG1hc2s9InVybCgjbWFzaykiIC8+Cjwvc3ZnPg==)](http://www.ejaugust.com/)
<br>[![Released under MIT License](https://img.shields.io/badge/License-MIT-212121?labelColor=007ec6&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTp3aGl0ZTtzdHJva2Utd2lkdGg6Ljk5OTc1MDAyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjYuNDAwMDAwMTtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgZD0iTTQuMjUgOS41SDZNNC4yNSA3Ljc1SDZtMi4wMjMtNS41YzAgLjY5LS45MDQgMS4yNS0yLjAyMyAxLjI1LTEuMTE5IDAtMi4wMjItLjU1OS0yLjAyMi0xLjI1QzMuOTc4IDEuNTU4IDQuODggMSA2IDFjMS4xMTkgMCAyLjAyMy41NTggMi4wMjMgMS4yNXpNNiAxMVYzLjUiLz48L3N2Zz4=&logoColor=white)](https://github.com/kireji-app/kireji/LICENSE.md)
<br>[![Sponsor this Project](https://img.shields.io/badge/Sponsor-212121?labelColor=red&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OTciIGhlaWdodD0iNDcwIj48cGF0aCBkPSJNMTQwIDIwQzczIDIwIDIwIDc0IDIwIDE0MGMwIDEzNSAxMzYgMTcwIDIyOCAzMDMgODgtMTMyIDIyOS0xNzMgMjI5LTMwMyAwLTY2LTU0LTEyMC0xMjAtMTIwLTQ4IDAtOTAgMjgtMTA5IDY5LTE5LTQxLTYwLTY5LTEwOC02OXoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNDAiIGZpbGw9Im5vbmUiLz48L3N2Zz4=&logoColor=white)](https://github.com/sponsors/EJAugust)