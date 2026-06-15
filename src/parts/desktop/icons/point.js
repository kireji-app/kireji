const dragStart = { x: POINTER_EVENT.clientX, y: POINTER_EVENT.clientY }
const isOnContainer = TARGET_ELEMENT === Desktop.container
const selectionStart = DesktopIcons.rid
const iconElements = document.querySelectorAll(`#desktop_parts>desktop-icon`)
const focusIcon = document.activeElement.tagName === "desktop-icon" ? document.activeElement : null

Pointer.handle({
 down() {
  let mask = selectionStart

  if (!isOnContainer) {

   const itemMask = 1n << BigInt(TARGET_ELEMENT.getAttribute("data-index"))

   if (HotKeys.combo === "shift") {
    debug('handle ranged selection here')
   } else if (HotKeys.combo === "context") {
    mask ^= itemMask
   } else {
    mask = itemMask
   }
   TARGET_ELEMENT.focus()
  } else if (!["context", "shift"].includes(HotKeys.combo))
   mask = 0n

  if (DesktopIcons.rid !== mask)
   DesktopIcons.setRID(mask)

  if (isOnContainer) {
   this.dragBox ??= Desktop.container.appendChild(document.createElement("div"))
   this.dragBox.setAttribute("id", "selection-box")
   this.dragBox.setAttribute("style", `--x:${dragStart.x}px;--y:${dragStart.y};--w:0px;--h:0px`)
  }
 },
 drag(pointerEvent) {
  if (isOnContainer) {
   focusIcon?.blur()
   let mask = selectionStart

   this.dragBox.setAttribute("style", `--x:${Math.min(dragStart.x, pointerEvent.clientX)}px;--y:${Math.min(dragStart.y, pointerEvent.clientY)}px;--w:${Math.abs(pointerEvent.clientX - dragStart.x)}px;--h:${Math.abs(pointerEvent.clientY - dragStart.y)}px`)
   const intersectionMask = this.getIntersectionMask()

   if (HotKeys.combo === "context") {
    mask ^= intersectionMask
   } else if (HotKeys.combo === "shift") {
    mask |= intersectionMask
   } else {
    mask = intersectionMask
   }

   if (DesktopIcons.rid !== mask)
    DesktopIcons.setRID(mask)
  }
 },
 reset() {
  if (isOnContainer) {
   this.dragBox?.remove()
   this.dragBox = null
   if (DesktopIcons.rid !== selectionStart) {
    debug('determine new focus item now')
   } else {
    focusIcon?.focus()
   }
  }
 },
 doubleClick() {
  if (TARGET_ELEMENT === Desktop.container || ["shift", "alt", "context"].includes(HotKeys.combo))
   return

  DesktopIcons.setRID(0n)

  const iconNode = DesktopIcons.maskedNodeList[Number(TARGET_ELEMENT.getAttribute("data-index"))]
  const targetLocation = (_.command === "debug" ? `http://${iconNode.subject.host}.localhost:${_.port}` : `https://${iconNode.subject.host}`) + RID.toPath(_.rid)
  location = targetLocation
 },
 getIntersectionMask() {
  const anchorRect = this.dragBox.getBoundingClientRect()
  let intersectionMask = 0n

  iconElements.forEach(iconElement => {
   const targetRect = iconElement.getBoundingClientRect()

   // Check for overlap using the collision detection formula
   if (anchorRect.left < targetRect.right &&
    anchorRect.right > targetRect.left &&
    anchorRect.top < targetRect.bottom &&
    anchorRect.bottom > targetRect.top) {
    intersectionMask |= 1n << BigInt(iconElement.getAttribute("data-index"))
   }
  })

  return intersectionMask
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})