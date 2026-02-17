if (client.hydrated) {
 document.body.classList.add(bodyMode.key)

 Q("#" + bodyMode.id)?.setAttribute("data-state", bodyMode.stateData)
}