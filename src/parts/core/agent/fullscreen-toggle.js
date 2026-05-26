if (!document.fullscreenElement) {

 if (FORCE_STATE === false)
  return FORCE_STATE

 if (document.documentElement.requestFullscreen) {
  document.documentElement.requestFullscreen()
 } else if (document.documentElement.webkitRequestFullscreen) {
  document.documentElement.webkitRequestFullscreen()
 } else if (document.documentElement.msRequestFullscreen) {
  document.documentElement.msRequestFullscreen()
 }
 return true
} else {

 if (FORCE_STATE === true)
  return FORCE_STATE

 if (document.exitFullscreen) {
  document.exitFullscreen()
 } else if (document.webkitExitFullscreen) {
  document.webkitExitFullscreen()
 } else if (document.msExitFullscreen) {
  document.msExitFullscreen()
 }
}

return false