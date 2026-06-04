const registrations = await navigator.serviceWorker.getRegistrations()

define(Update, {
 registrations: { value: registrations }
})