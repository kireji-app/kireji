const targetLocation = (+_.local ? `http://${HOST}.localhost:${_.port}` : `https://${HOST}`) + encodePathname(_.routeID)
document.body.classList.add("unhydrated")

// Press the button before navigation starts.
const instanceIndex = desktop.windows.instances.findIndex(window => window.application.host === HOST)
if (instanceIndex !== -1) {
 const task = document.querySelectorAll(`task-bar>button.task`)[instanceIndex]
 task.classList.add("preview-pressed", "pressed")
}

location = targetLocation