let imgOwner = thisPart

while (imgOwner && !imgOwner.filenames.includes(IMAGE_NAME))
 imgOwner = imgOwner.prototype

if (!imgOwner)
 throw error(`can't find image "${IMAGE_NAME}"`)

return `var(--${imgOwner.host.replaceAll("-", "_").replaceAll(".", "-")}--${IMAGE_NAME.replaceAll("-", "_").replaceAll(".", "-")})`