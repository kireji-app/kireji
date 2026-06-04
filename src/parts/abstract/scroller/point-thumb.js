const markedRID = thisScroller.rid
const scrollerLimit = thisScroller.cardinality - 1n
const rangeLimit = BigInt(Math.trunc(Number(scrollerLimit) * (1 - thisScroller.container.clientHeight / thisScroller.container.scrollHeight)))

Pointer.handle({
 drag(pointerEvent) {
  const positionalRID = markedRID + BigInt(Math.trunc((pointerEvent.clientY - POINTER_EVENT.clientY) / (thisScroller.scrollBar.clientHeight - (Era.arm === Era.vintage ? 2 * thisScroller.scrollBar.clientWidth : 0)) * Number(scrollerLimit)))
  const newRID = positionalRID < 0n ? 0n : (positionalRID > rangeLimit) ? rangeLimit : positionalRID
  if (newRID !== thisScroller.rid) thisScroller.setRID(newRID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})