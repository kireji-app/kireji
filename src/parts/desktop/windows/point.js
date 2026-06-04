Pointer.handle({
 click() {
  const window = Windows.instances[INSTANCE_INDEX]
  if (_.openTask === window.part) {
   const focusElement = Q(`body>:not(task-bar):focus-within, body>task-bar>button.task.pressed:focus`)
   if (focusElement && Era && Era.arm === Era.vintage)
    _.gotoPart("desktop.parts")
   else TARGET_ELEMENT.focus()
  } else _.gotoPart(window.part.host)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})