if (lookup(MODEL.host)) {
 if (typeof MODEL.top === "number" && MODEL.top < 2000) {
  if (typeof MODEL.left === "number" && MODEL.left < 2000) {
   if (typeof MODEL.width === "number" && MODEL.width < 2000) {
    if (typeof MODEL.height === "number" && MODEL.height < 2000) {
     return true
    } else throw error(`invalid height`)
   } else throw error(`invalid width`)
  } else throw error(`invalid left`)
 } else throw error(`invalid top`)
} else throw error(`can't find part "${MODEL.host}"`)