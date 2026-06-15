const selectedNodes = new Set(DesktopIcons.selectedNodes)

for (const alreadySelectedIcon of document.querySelectorAll(`#desktop_parts desktop-icon[data-selected]`)) {
 const iconNode = DesktopIcons.maskedNodeList[Number(alreadySelectedIcon.getAttribute("data-index"))]
 if (selectedNodes.has(iconNode))
  selectedNodes.delete(iconNode)
 else alreadySelectedIcon.removeAttribute("data-selected")
}

for (const nodeToSelect of selectedNodes) {
 const iconElement = Q(`#desktop_parts desktop-icon[data-index="${nodeToSelect.maskIndex}"]`)
 iconElement.setAttribute("data-selected", "")
}