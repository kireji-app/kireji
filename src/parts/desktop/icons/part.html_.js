let result = ""

for (let iconIndex = 0; iconIndex < DesktopIcons.superset.length; iconIndex++) {
 const iconPart = lookup(DesktopIcons.superset[iconIndex])
 let truncatedName = ""
 const iconName = iconPart.titleMenu ?? iconPart.title ?? iconPart.key
 for (const word of iconName.split(" ")) {
  if (truncatedName.length + word.length + 1 > 20) {
   truncatedName += "..."
   break
  }
  truncatedName += " " + word
 }
 const isSelected = (DesktopIcons.rid & 1n << BigInt(iconIndex)) !== 0n
 const maskVar = iconPart.cssVariableOfImage("part.png")
 result += `<desktop-icon ${DesktopIcons.pointAttr()} tabIndex=0 data-index=${iconIndex}${isSelected ? " data-selected" : ""}><icon-mask style="-webkit-mask-image:${maskVar};mask-image:${maskVar}"><img class=icon src="${iconPart.placeholderImage("part.png")}"/></icon-mask><span class=label>${truncatedName}</span></desktop-icon>`
}

return result