Menu.element = Q("task-menu") ?? (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = Menu["menu.html"]
 return offscreen.querySelector("task-menu")
})()

Menu.button = Q("button.menu")