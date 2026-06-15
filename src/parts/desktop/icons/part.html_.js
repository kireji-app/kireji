const iconsHTML = []

for (let iconIndex = 0; iconIndex < DesktopIcons.maskedNodeList.length; iconIndex++) {
 // TODO: support non-part icons.
 const iconNode = DesktopIcons.maskedNodeList[iconIndex]
 let truncatedName = ""
 const iconName = iconNode.subject.titleMenu ?? iconNode.subject.title ?? iconNode.subject.key
 for (const word of iconName.split(" ")) {
  if (truncatedName.length + word.length + 1 > 20) {
   truncatedName += "..."
   break
  }
  truncatedName += " " + word
 }
 const isSelected = (DesktopIcons.rid & 1n << BigInt(iconIndex)) !== 0n
 const maskVar = iconNode.subject.cssVariableOfImage("part.png")
 iconsHTML.push(`<desktop-icon ${DesktopIcons.pointAttr()} tabIndex=0 data-index=${iconIndex}${isSelected ? " data-selected" : ""}><icon-mask style="-webkit-mask-image:${maskVar};mask-image:${maskVar}"><img class=icon src="${iconNode.subject.placeholderImage("part.png")}"/></icon-mask><span class=label>${truncatedName}</span></desktop-icon>`)
}

return iconsHTML.join("")