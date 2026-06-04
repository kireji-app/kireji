KirejiSidebar.element = Q("side-bar") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = `<side-bar>${KirejiSidebar["view.html"]}</side-bar>`
 return offscreen.querySelector("side-bar")
})()