pointer.handle({
 click() {
  const window = windows.instances[INSTANCE_INDEX]
  if (_.application === window.application) {
   const focusElement = Q(`body>:not(task-bar):focus-within, body>task-bar>button.task.pressed:focus`)
   if (focusElement && desktop.era.arm === desktop.era.vintage)
    _.gotoApplication("desktop.parts")
   else TARGET_ELEMENT.focus()
  } else _.gotoApplication(window.application.host)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})