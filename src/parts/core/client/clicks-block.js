const clickHandler = POINTER_EVENT.target.getAttribute("data-onclick")

if (clickHandler) {

 const [partHost, methodName, ...args] = JSON.parse(clickHandler)
 const part = partsByHost[partHost]

 if (part[methodName] && typeof part[methodName] === "function")
  part[methodName](...args)
 else
  throw new ReferenceError(`ClickAttr Error: could not find a method called "${methodName}" on part ${partHost}.`)

 return
}

POINTER_EVENT.preventDefault()
POINTER_EVENT.stopPropagation()