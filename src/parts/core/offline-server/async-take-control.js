await logScope(1, 'Ensuring ServiceWorker Controller', async log => {

 if (!OfflineServer.registration) {

  log("Acquiring Registration.")

  const registration = await navigator.serviceWorker.getRegistration()

  define(OfflineServer, {
   registration: { value: registration },
  })

  if (!OfflineServer.registration.active)
   throw error('Unexpected lack of existing service worker registration while installing offline server facet in client.')

  define(OfflineServer, {
   controller: { value: navigator.serviceWorker.controller }
  })

  if (_.command === "debug") {
   navigator.serviceWorker.oncontrollerchange = () => {
    if (_.resetLocalState === "enabled") {
     /* Reset to the landing hash on service worker update (useful during
        development that changes the part arrangement frequently. */
     location.assign(location.origin + `/${_.version}/`)
    } else location.reload()
   }
  }

 }

 OfflineServer.registration.onupdatefound = event => {

  const target = OfflineServer.registration.installing || OfflineServer.registration.waiting

  if (_.command === "debug")
   target.postMessage({ code: "activate" })
 }

 if (_.command === "debug")
  addEventListener("focus", () => {
   log("Checking for ServiceWorker updates.")
   OfflineServer.registration.update().catch(registrationError => warn(registrationError))
  })
})