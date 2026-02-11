if (_.applications[MODEL.host]) {
 if (typeof MODEL.top === "number" && MODEL.top < 2000) {
  if (typeof MODEL.left === "number" && MODEL.left < 2000) {
   if (typeof MODEL.width === "number" && MODEL.width < 2000) {
    if (typeof MODEL.height === "number" && MODEL.height < 2000) {
     return true
    } else throw new Error(`Model To RouteID Error: Cannot generate window with invalid "height" property.`)
   } else throw new Error(`Model To RouteID Error: Cannot generate window with invalid "width" property.`)
  } else throw new Error(`Model To RouteID Error: Cannot generate window with invalid "left" property.`)
 } else throw new Error(`Model To RouteID Error: Cannot generate window with invalid "top" property.`)
} else throw new ReferenceError(`Model To RouteID Error: Cannot generate window for non-existing application "${MODEL.host}".`)