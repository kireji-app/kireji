Pointer.handle({
 click() {

  const button = Q("#update-button")

  if (AboutApp.newVersion) {
   location.href = `${location.origin}/${AboutApp.newVersion}/${RID.toHash(_.rid)}/?from=${_.version}`
   return
  }

  function showTemporaryMessage(msg) {
   const buttonContentCache = button.textContent
   button.setAttribute("disabled", "")
   button.textContent = msg
   AboutApp.container.focus()
   setTimeout(() => {
    if (button) {
     button.removeAttribute("disabled")
     button.textContent = buttonContentCache
    }
   }, 5000)
  }

  fetch(`${location.origin}/-v`)
   .then(response => response.text())
   .then(version => {
    if (AboutApp.isNewerVersion(version)) {
     AboutApp.newVersion = version
     button.textContent = "Upgrade to " + version
    } else showTemporaryMessage("Already up to date")
   })
   .catch(fetchError => {
    logError(fetchError)
    showTemporaryMessage("An Error Occurred")
   })
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})