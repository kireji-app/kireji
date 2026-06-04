const selectedIcons = new Set(DesktopIcons.chosenParts)

for (const alreadySelectedIcon of document.querySelectorAll(`#desktop_parts desktop-icon[data-selected]`)) {
 const iconPart = lookup(DesktopIcons.superset[Number(alreadySelectedIcon.getAttribute("data-index"))])
 if (selectedIcons.has(iconPart))
  selectedIcons.delete(iconPart)
 else alreadySelectedIcon.removeAttribute("data-selected")
}

for (const iconToSelect of selectedIcons) {
 const iconElement = Q(`#desktop_parts desktop-icon[data-index="${DesktopIcons.superset.indexOf(iconToSelect)}"]`)
 iconElement.setAttribute("data-selected", "")
}