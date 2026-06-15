/** @type {IPartAny} */
const activePart = KirejiTabGroup.activeTab.subject

return (
 activePart.isInstance ? (
  activePart.disabled ? (
   "<p class=disabled-message>This part is currently disabled.</p>" +
   "<h3>Hash</h3>" +
   `<pre id=live-hash></pre>` +
   "<h3>Integer</h3>" +
   `<pre id=live-rid>-1</pre>` +
   "<h3>JSON</h3>" +
   `<pre id=live-model></pre>`
  ) : (
   "<p class=disabled-message></p>" +
   "<h3>Hash</h3>" +
   `<pre id=live-hash>${RID.toHash(activePart.rid) || "&nbsp;"}</pre>` +
   "<h3>Integer</h3>" +
   `<pre id=live-rid>${activePart.rid}</pre>` +
   "<h3>JSON</h3>" +
   `<pre id=live-model>${serialize(activePart.model)}</pre>`
  )
 ) : (
  "<p class=disabled-message>Abstract parts do not have a state.</p>"
 )
)