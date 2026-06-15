Client.promise.then(() => {

 TaskBar.element = Q("task-bar")

 if (Menu.arm !== Menu.closed)
  Q("task-bar>button.menu").focus()
 else
  Q("title-bar")?.focus()

 document.addEventListener('pointerdown', pointerEvent => {
  if (Menu.arm !== Menu.closed && !inRect(pointerEvent, Menu.element.getBoundingClientRect())) {

   if (inRect(pointerEvent, TaskBar.element.getBoundingClientRect())) {
    pointerEvent.stopPropagation()
    pointerEvent.preventDefault()
   }

   Menu.setModel("closed")
  }
 }, { capture: true })
})