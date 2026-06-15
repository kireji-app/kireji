const actionOwners = []
let actionOwner = thisPart

while (actionOwner) {

 if (Object.hasOwn(actionOwner, ACTION_KEY) && typeof actionOwner[ACTION_KEY] === "function")
  actionOwners[FROM_ROOT ? "unshift" : "push"](actionOwner)

 actionOwner = actionOwner.prototype
}

for (const owner of actionOwners) {

 if (LOG_BEFORE_EACH)
  log(3, `${ACTION_KEY} ${owner.host}`)

 owner[ACTION_KEY].call(thisPart)
}