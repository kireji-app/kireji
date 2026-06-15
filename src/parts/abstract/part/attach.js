if (!thisPart.isInstance)
 throw error(`can't attach to abstract part`)

if (typeof EVENT_TYPE !== "string")
 throw error(`EVENT_TYPE must be a string`)

if (!(EVENT_TYPE in thisPart.callbacks))
 throw error(`unknown event type "${EVENT_TYPE}"`)

if (!(Base.isPrototypeOf(RECEIVER)))
 throw error(`${EVENT_TYPE} receiver must be a part`)

thisPart.callbacks[EVENT_TYPE][RECEIVER.host + ":" + CALLBACK_NAME] = [RECEIVER, CALLBACK_NAME]