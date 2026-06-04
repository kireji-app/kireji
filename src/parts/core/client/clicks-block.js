const clickHandler = POINTER_EVENT.target.getAttribute("data-onclick")

if (clickHandler) {

 const [partHost, actionName, ...args] = JSON.parse(clickHandler)
 const part = lookup(partHost)

 if (part[actionName] && typeof part[actionName] === "function")
  part[actionName](...args)
 else
  throw error(`can't find action "${actionName}"`)

 return
}

POINTER_EVENT.preventDefault()
POINTER_EVENT.stopPropagation()