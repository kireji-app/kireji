await Agent.promise

define(AddressBar, {
 throttleDuration: { value: Agent.isSafari ? 350 : 75 },
 throttleStartTime: { value: _.now, writable: true }
})