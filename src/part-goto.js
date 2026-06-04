const targetLocation = (_.command === "debug" ? `http://${HOST}.localhost:${_.port}` : `https://${HOST}`) + RID.toPath(_.rid)
document.body.classList.add("unhydrated")

if (_.includeDesktop === "demo" || (_.command === "debug" && (_.includeDesktop === "full" || _.includeDesktop === 'local-only'))) {

 // Press the task-bar button before navigation starts.
 const instanceIndex = Windows.instances.findIndex(window => window.part.host === HOST)
 if (instanceIndex !== -1) {
  const task = document.querySelectorAll(`task-bar>button.task`)[instanceIndex]
  task.classList.add("preview-pressed", "pressed")
 }
}

location = targetLocation