pointer.handle({
 click() {
  const window = windows.instances[INSTANCE_INDEX]
  if (_.application === window.application) {
   if (Q('task-bar:focus-within') && desktop.era.arm === desktop.era.vintage) {
    debug('focus window now')
   } else _.gotoApplication("desktop.parts")
  } else _.gotoApplication(window.application.host)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})