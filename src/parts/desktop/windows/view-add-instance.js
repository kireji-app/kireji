const newTaskButton = (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = windows.renderTaskHTML(INSTANCE, INSTANCE_INDEX)
 return offscreen.querySelector("button")
})()

Q('task-bar>flex-spacer').before(newTaskButton)