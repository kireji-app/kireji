# kireji: Entropy-Perfect Multi-Origin Web Applications
**kireji** is a web framework that maximally compresses data models using minimal perfect hash functions (MPHFs).
It achieves the information-theoretic lower bound, creating the smallest possible collision-free, duplicate-free and gap-free hashes for arbitrary data.

Any group of applications powered by kireji can have its entire group state stored in a tight place - like a single URL or even a DNS TXT record.
Model data is recovered instantly from a hash and vice-versa.
This gives applications deterministic, lossless deep linking, state bookmarking, historical replay and peer-to-peer sharing (via simple URL sharing) without users interacting with a central server.
## Entropy-Perfect Encoding

Each application state is assigned a unique variable-length base64 hash, derived from a bijective minimal perfect hash function.
This makes them as compact and expressive as is mathematically possible.

kireji provides a compression solution that is uniquely built for the given data model and can represent every state in that model.

All kireji hashes are inherently integers (implemented using the `bigint` primitive in JavaScript).
Because the hash function has no gaps, no duplicates, and no collisions, it is not possible to achieve a smaller lossless hash of a given data model than this.

If there are 10,000,000,000,000,000,000,000,000,000,000,000,000,000,000 possible ways to populate your application's data model, then kireji produces a hash integer that is always between 0 and 9,999,999,999,999,999,999,999,999,999,999,999,999,999,999.
kireji can then instantly hash any instance of the data model and instantly recover one from any integer in that range.

An example use-case of this is embedding rich state information in places with limited space, such as a URL or DNS TXT record, without the syntactical overhead of query parameters,JSON objects, or delimiters.

```
https://www.ejaugust.com/0.126.3/4lb5kAsH_R0Dv_UHg/
```

### Further Reading
* [Entropy-Perfect Encoding](https://www.ejaugust.com/0.126.4/4lb5kAh4PhZXOKxrM/)

## MVC + MPHF Architecture

kireji can also be used as a complete front-end framework.
Its minimal perfect hash function is highly reactive with a built-in event system
It instantly reflects per-component tweaks to a given model with an extensible model-view-controller (MVC) architecture.

* Each controller is a stateful component (called a <strong>part</strong>) with its own cardinality.
* Parts assemble like LEGO® bricks, with a root part producing a hash representing its entire hierarchy.
* JavaScript's prototype chain enables compositional inheritance between parts.

## DNS-Based Namespacing

When used as a web application front-end framework, each part in a kireji model can be assigned a name that follows DNS semantics so that a web application's URL (such as [www.ejaugust.com](https://www.ejaugust.com)) can be quickly discerned from a runtime reference to one of its parts, such as:

```js
_.app.kireji.www.editor.selected
```

The root part is represented by `_` and is the only global object.
This prevents polluting the global namespace and allows all parts to make absolute reference to each other.

The framework stores its MVC abstracts and MPHF arithmetic under the domain name `"core.parts"`, allowing them to be reached like so:

```js
_.parts.core
```

You can explore this organization in action by going to [www.kireji.app](https://www.kireji.app).

### Further Reading
* [Why DNS?](https://www.ejaugust.com/0.126.4/4lbHaxsKnzRXOKxrM/)

## Live Applications

kireji is in alpha.
To see the technology in action, check out the [demo](https://github.com/kireji-app/demo) repo.

### **Zero Dependencies: A Simpler Equation**

kireji is written entirely with vanilla JavaScript, CSS, and HTML.
No libraries, frameworks, or third-party packages are imported.
This choice was made to preserve full control over the performance of the framework, align as closely as possible with web standards, reduce dependency resolution for applications using kireji, and to offer an opportunity to simplify the equation that defines the system's behavior.
By encoding its own components within its data model, kireji and its surrounding data model can be reasoned about end-to-end, as a self-contained and self-descriptive system.
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