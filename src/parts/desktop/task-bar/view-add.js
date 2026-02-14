if (!hydrated)
 _.parts.core.client.promise.then(() => {

  taskBar.element = Q("task-bar")

  if (taskBar.menu.arm !== taskBar.menu.closed)
   Q("task-bar>button.menu").focus()
  else
   Q("title-bar").focus()

  document.addEventListener('pointerdown', pointerEvent => {
   if (taskBar.menu.arm !== taskBar.menu.closed && !inRect(pointerEvent, taskBar.menu.element.getBoundingClientRect())) {

    if (inRect(pointerEvent, taskBar.element.getBoundingClientRect())) {
     pointerEvent.stopPropagation()
     pointerEvent.preventDefault()
    }

    taskBar.menu.setRouteID(taskBar.menu.modelToRouteID("closed"))
   }
  }, { capture: true })
 })