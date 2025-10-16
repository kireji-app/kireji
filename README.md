# Kireji - *Web Framework*
**Part of the Kireji Project**
> *An application is the state it's in.*
## Overview
The Kireji Web Framework is a reactive full-stack web framework that uses the MPHF Coordinate System and the MVC paradigm to build multi-origin web app ecosystems. It offers a routing system that achieves the information-theoretic lower bound of data compression, enabling comprehensive deep linking, session bookmarking without user accounts or local storage, peer-to-peer data sharing without uploads or accounts, and cross-origin communication without cookies or CORS.
## The Kireji Project
The Kireji Project poses a question: **What if we could treat all functional software as points in a single, mathematically mapped, and traversable space?**
| Repo | Purpose
| ---- | -------
| [MPHF](https://github.com/kireji-app/mphf#readme) | [Coordinate System<br><sub>Provides the bijective coordinate system</sub>](https://github.com/kireji-app/mphf#readme)
| **Kireji** | **Web Framework - ★ You are here<br><sub>Uses MPHF to encode app state in URLs and manage cross-origin traversal</sub>**
| [Demo](https://github.com/kireji-app/demo#readme) | [App Ecosystem<br><sub>Demonstrates practical applications of the Kireji Project</sub>](https://github.com/kireji-app/demo#readme)
## Implementation

> <sub>Note: This is currently an empty placeholder for the framework that powers the [Demo App Ecosystem](https://github.com/kireji-app/demo#readme). Check back later to see if the package has been populated.</sub>

This framework uses the **MPHF Coordinate System** to assign a unique, gap-free coordinate to every valid point in a space constrained by its component definitions. It uses the **MVC paradigm** to efficiently update the DOM. It uses a **packing mechanism** to create single-artifact builds. It provides a library of **premade components** including a **web server** and **service worker** to bootstrap the development process.

### Components
Components act to refine the "Total Software Space" into a manageable set of **algebraically constrained, functional applications.**

This refinement is designed to provide:
- **Guaranteed Functionality:** Ensuring every coordinate represents a stable, working application (no "one sandal, one stiletto" combinations).
- **Comprehensive Deep Linking:** Allowing every coordinate to be bookmarked and shared, retaining a full, multi-origin session state in the most compressed URL possible without reliance on cookies, servers, or user tracking.
- **Component Encapsulation:** Defining all applications as assemblies of stateful components (called **parts**) built on the MPHF-MVC backbone. Parts then assemble like LEGO® bricks, each assembly representing its own configuration space.
- **Reactive Navigation:** Ensuring navigation from one coordinate to another changes only the page elements that need to change to reflect the new position.

### Namespacing

Parts in kireji are assigned unique names following DNS semantics, relating a web application's origin (e.g., www.ejaugust.com) to its individual components, for example:

```js
_.com.example
_.com.example.scroller
_.com.example.www.home
_.com.example.www.blog
```

### Premade Components
The framework provides MVC abstracts and MPHF arithmetic under the domain "core.parts":

```js
_.parts.core.mix
_.parts.core.match
_.parts.core.clip
...
```

It provides bootstrapping and full-stack functionality under the domain "desktop.parts":
```js
_.parts.desktop.server
_.parts.desktop.client
_.parts.desktop.worker
_.parts.desktop.addressBar
...
```

## Tech Stack

The Kireji Web Framework does not import any third-party libraries, frameworks, or packages so that it can be reasoned about end-to-end as a self-contained and self-descriptive system.

## Status and License
The Kireji Web Framework is in **Alpha**.\
The Kireji Project is in **early research and development**.

[![kireji on npm](https://img.shields.io/npm/v/kireji?style=for-the-badge&labelColor=CB3837&logo=npm&logoColor=white&label=NPM+package&color=212121)](https://www.npmjs.com/kireji)
<br>[![Project Status: Alpha](https://img.shields.io/badge/status-alpha-212121?style=for-the-badge&labelColor=181717&logo=github&logoColor=white)](https://www.repostatus.org/#alpha)
<br>[![Commits](https://img.shields.io/github/commit-activity/t/kireji-app/kireji?style=for-the-badge&labelColor=181717&color=212121&logo=github&logoColor=white)](https://github.com/kireji-app/demo/commits/)
<br>[![Last Commit](https://img.shields.io/github/last-commit/kireji-app/kireji?style=for-the-badge&labelColor=181717&color=212121&logo=github&logoColor=white)](https://github.com/kireji-app/demo)
<br>[![Copyright © 2023-2025 <a href="https://www.ejaugust.com">Eric Augustinowicz</a>](https://img.shields.io/badge/2023%20--%202025-Eric_Augustinowicz-212121?labelColor=007ec6&style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk3cHgiIGhlaWdodD0iMTk3cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj4KIDxkZWZzPgogIDxtYXNrIGlkPSJtYXNrIj4KICAgPGNpcmNsZSBjeD0iOTgiIGN5PSI5OCIgcj0iOTgiIGZpbGw9IndoaXRlIiAvPgogICA8Y2lyY2xlIGN4PSI5OCIgY3k9Ijk4IiByPSI3OCIgZmlsbD0iYmxhY2siIC8+CiAgIDxjaXJjbGUgY3g9Ijk4IiBjeT0iOTgiIHI9IjU1IiBmaWxsPSJ3aGl0ZSIgLz4KICAgPGNpcmNsZSBjeD0iOTgiIGN5PSI5OCIgcj0iMzAiIGZpbGw9ImJsYWNrIiAvPgogICA8cmVjdCB4PSIxMTUiIHk9Ijg1IiB3aWR0aD0iNDUiIGhlaWdodD0iMjUiIGZpbGw9ImJsYWNrIiAvPgogIDwvbWFzaz4KIDwvZGVmcz4KIDxwYXRoIGQ9Ik0gOTgsMCBBIDk4LDk4IDAgMSAxIDk4LDE5NiBBIDk4LDk4IDAgMSAxIDk4LDAgWiIgZmlsbD0id2hpdGUiIG1hc2s9InVybCgjbWFzaykiIC8+Cjwvc3ZnPg==)](http://www.ejaugust.com/)
<br>[![Released under MIT License](https://img.shields.io/badge/License-MIT-212121?labelColor=007ec6&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTp3aGl0ZTtzdHJva2Utd2lkdGg6Ljk5OTc1MDAyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjYuNDAwMDAwMTtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgZD0iTTQuMjUgOS41SDZNNC4yNSA3Ljc1SDZtMi4wMjMtNS41YzAgLjY5LS45MDQgMS4yNS0yLjAyMyAxLjI1LTEuMTE5IDAtMi4wMjItLjU1OS0yLjAyMi0xLjI1QzMuOTc4IDEuNTU4IDQuODggMSA2IDFjMS4xMTkgMCAyLjAyMy41NTggMi4wMjMgMS4yNXpNNiAxMVYzLjUiLz48L3N2Zz4=&logoColor=white)](https://github.com/kireji-app/kireji/LICENSE.md)
<br>[![Sponsor this Project](https://img.shields.io/badge/Sponsor-212121?labelColor=red&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OTciIGhlaWdodD0iNDcwIj48cGF0aCBkPSJNMTQwIDIwQzczIDIwIDIwIDc0IDIwIDE0MGMwIDEzNSAxMzYgMTcwIDIyOCAzMDMgODgtMTMyIDIyOS0xNzMgMjI5LTMwMyAwLTY2LTU0LTEyMC0xMjAtMTIwLTQ4IDAtOTAgMjgtMTA5IDY5LTE5LTQxLTYwLTY5LTEwOC02OXoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNDAiIGZpbGw9Im5vbmUiLz48L3N2Zz4=&logoColor=white)](https://github.com/sponsors/EJAugust)