const bodyClassList = []

if (Menu.arm?.key === "open")
 bodyClassList.push("menu-fully-open")

if (Menu.arm?.key !== "closed")
 bodyClassList.push("menu-pressed")

return bodyClassList