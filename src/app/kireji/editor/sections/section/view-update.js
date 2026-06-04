const detailsElement = Q(`#info-${thisPart.key}`)

if (detailsElement) {
 if (thisPart.model)
  detailsElement.setAttribute("open", "")
 else
  detailsElement.removeAttribute("open")
}