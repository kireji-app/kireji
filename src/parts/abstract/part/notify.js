if (thisPart.isAbstract)
 throw error(`can't notify from abstract part`)

if (typeof EVENT_TYPE !== "string")
 throw error(`EVENT_TYPE must be a string`)

if (!(EVENT_TYPE in thisPart.callbacks))
 throw error(`unknown event type "${EVENT_TYPE}"`)

for (const key in thisPart.callbacks[EVENT_TYPE]) {
 const [receiver, callbackName] = thisPart.callbacks[EVENT_TYPE][key]
 receiver[callbackName](thisPart)
}