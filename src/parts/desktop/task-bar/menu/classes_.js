const bodyClassList = []

if (menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

return bodyClassList