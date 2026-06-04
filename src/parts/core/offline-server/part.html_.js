const includeBootstrap = environment.startsWith("node")
return /* html */`<script defer ${includeBootstrap ? "" : `src="/${_.version}/build.js"`}>${includeBootstrap ? /* js */`(async () => {

const registration = await navigator.serviceWorker.register("/${_.version}/build.js", {
 updateViaCache: "all",
 scope: "/${_.version}/"
})

// Aggressively remove all old service workers.
const oldRegistrations = await navigator.serviceWorker.getRegistrations()

await Promise.all(oldRegistrations.map(oldRegistration => {
 if (oldRegistration !== registration)
  oldRegistration.unregister()
}))

if (!registration.active) {
 await new Promise(resolve => {
  const incomingServiceWorker = registration.waiting ?? registration.installing
  
  incomingServiceWorker.onstatechange = event => {
   if (event.target.state == "activated")
    resolve(event.target)
  }
 })
}

navigator.serviceWorker.controller ?? await new Promise(resolve => {
 navigator.serviceWorker.oncontrollerchange = resolve
 registration.active.postMessage({ code: "claim" })
})

const oldScript = document.body.querySelector("script")
const newScript = document.createElement("script")

newScript.setAttribute("src", "/${_.version}/build.js")
newScript.setAttribute("defer", "")
oldScript.replaceWith(newScript)

})()` : ""}</script>`