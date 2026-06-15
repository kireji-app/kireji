if (!INPUT_PATH.endsWith("/"))
 throw `Pathname missing trailing slash: ${INPUT_PATH}`

const segments = INPUT_PATH.split("/")

if (segments.length > 4)
 throw `Pathname has too many segments`

if (segments.length < 4)
 throw `Pathname has too few segments`

return RID.fromHash(segments[2])