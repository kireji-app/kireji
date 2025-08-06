# kireji: Entropy-Perfect Multi-Origin Web Applications

**kireji** is a web framework that maximally compresses data models using minimal perfect hash functions (MPHFs). It achieves the information-theoretic lower bound, creating the smallest possible collision-free, duplicate-free and gap-free hashes for arbitrary data.

Any group of applications powered by kireji can have its entire group state stored in a tight place - like a single URL or even a DNS TXT record. Model data is recovered instantly from a hash and vice-versa. This gives applications deterministic, lossless deep linking, state bookmarking, historical replay and peer-to-peer sharing (via simple URL sharing) without users interacting with a central server.

---

## Entropy-Perfect Encoding

Each application state is assigned a unique variable-length base64 hash, derived from a bijective minimal perfect hash function. This makes them as compact and expressive as is mathematically possible.

kireji provides a compression solution that is uniquely built for the given data model and can represent every state in that model.

All kireji hashes are inherently integers (implemented using the `bigint` primative in JavaScript). Because the hash function has no gaps, no duplicates, and no collisions, it is not possible to achieve a smaller lossless hash of a given data model than this.

If there are 10,000,000,000,000,000,000,000,000,000,000,000,000,000,000 possible ways to populate your application's data model, then kireji produces a hash integer that is always between 0 and 9,999,999,999,999,999,999,999,999,999,999,999,999,999,999. kireji can then instantly hash any instance of the data model and instantly recover one from any integer in that range.

An example use-case of this is embedding rich state information in places with limited space, such as a URL or DNS TXT record, without the syntactical overhead of query parameters,JSON objects, or delimiters.

```
https://www.ejaugust.com/0.126.3/4lb5kAsH_R0Dv_UHg/
```

## MVC + MPHF Architecture

kireji can also be used as a compelete front-end framework. Its minimal perfect hash function is highly reactive with a built-in event system. It instantly reflects per-component tweaks to a given model with an extensible model-view-controller (MVC) archetecture.

* Each controller is a stateful component (called a <strong>part</strong>) with its own cardinality.
* Parts assemble like LEGO® bricks, with a root part producing a hash representing its entire hierarchy.
* JavaScript's prototype chain enables compositional inheritance between parts.

---

## DNS-Based Namespacing

When used as a web application front-end framework, each part in a kireji model can be assigned a name that follows DNS semantics so that a web application's URL (such as [www.ejaugust.com](https://www.ejaugust.com)) can be quickly discerned from a runtime reference to one of its parts, such as:

```js
_.app.kireji.www.editor.selected
```

The root part is represented by `_` and is the only global object. This prevents poluting the global namespace and allows all parts to make absolute reference to eachother.

The framework stores its MVC abstracts and MPHF arithmetic under the domain name `"core.parts"`, allowing them to be reached like so:

```js
_.parts.core
```

You can explore this organization in action by going to [www.kireji.app](https://www.kireji.app).

---

## Live Applications

kireji is in alpha. To see the technology in action, check on the kireji.app platform. This is a connected cross-origin app ecosystem that unites eight different web applications into a single state. That way, as users browse between applications, they applications have in-depth knowledge of eachother's state.

This is done completely without cookies, javascript storage APIs, user authentication, or uploading state information to a central server. As a consequence, these applications provide a permalink to every possible state they can be in. This enables robust debugging.

* [kireji.app](https://www.kireji.app) – an entropy and hash-space explorer for the platform
* [ejaugust.com](https://www.ejaugust.com) – a notebook-style blog about the platform
* [desktop.parts](https://www.desktop.parts) – a preview of a GUI-based OS experience
### Coming Soon

The following apps are not built yet, but their domain names and landing pages have been added to the platform:
* [core.parts](https://www.core.parts) – likely to become a web-based Universal IDE
* [user.parts](https://www.user.parts) – potential editor for software parts
* [glowstick.click](https://www.glowstick.click) – purpose TBD
* [kireji.io](https://www.kireji.io) – the future gamified UIDE
* [orenjinari.com](https://www.orenjinari.com) – example of an artist's portfolio

---

## Learn More

<!-- Looking ahead? See [FUTURE.md](FUTURE.md) for a deep dive into what's coming next.-->
Explore the technical background and ideas that shape the kireji platform:

* [Entropy-Perfect Encoding](https://www.ejaugust.com/0.126.4/4lb5kAh4PhZXOKxrM/) — on URL space, compression theory, and minimal perfect hash functions
* [The Charm](https://www.ejaugust.com/0.126.3/4lbxJ29P-vnXOKxrM/) — on measuring entropy and URL information density
* [Why DNS?](https://www.ejaugust.com/0.126.4/4lbHaxsKnzRXOKxrM/) — part namespacing and platform-wide coordination
<!--
* [The Multiverse and the Universal IDE](https://www.ejaugust.com/0.126.4/4lbeO3z_cmrXOKxrM/) — metaphors for self-rewriting environments
* [The Gamified Universal IDE](https://www.ejaugust.com/0.126.4/4lbofySVBqVXOKxrM/) — an aspirational vision of immersive development tools -->

---

## **Technology Stack**

* **JavaScript (ECMAScript)**
* **CSS (Vanilla)**
* **HTML (W3C Standards)**
* **Service Workers for offline support**
* **Serverless-compatible HTML rendering**

---

### **Zero Dependencies: A Simpler Equation**

kireji is written entirely with vanilla JavaScript, CSS, and HTML. No libraries, frameworks, or third-party packages are imported.

This choice was made to preserve full control over the performance of the hash function, align closely with web standards, reduce dependency resolution for applications using kireji, and to offer an opportunity to simplify the equation that defines the system's behavior.

By encoding its own components within its data model, kireji and its surrounding data model can be reasoned about end-to-end, as a self-contained and self-descriptive system.

---

## **Current Status**
[![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha)
[![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)

The following milestones completed:

* Core framework functionality
* CI/CD pipeline
* MPFH for stateless deep linking and data compression
* Reactive front-end framework via MVC + MPFH
* Domain-named archetecture ready for DNS integration
* In-platform part inspector
* Node.js server built-in
* Local debugging and development at localhost:3000
* Desktop operating system preview
* Ready-made stateful components with HTML and CSS, such as
  - Scroller with custom scroll-bar implementation (more customizable than the native scrollbar)
  - Color mode management that automatically computes shades from a given color pallete
  - Additive parts for mutually exclusive variable assignments
  - Multiplicative parts for independant variables
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

---

## **License and Attribution**

<sub>© 2013–2025 Eric Augustinowicz and Kristina Soriano. All Rights Reserved.</sub> <sub>This is a personal research project in active development. It's not production-ready. Please do not copy or redistribute this codebase or its methods. All content is considered prior art.</sub>