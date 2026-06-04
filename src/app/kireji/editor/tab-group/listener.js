if (SENDER.disabled) {
 Q("#info-state").setAttribute("disabled", "")
 Q("#live-rid").textContent = -1n
 Q("#live-hash").innerHTML = ""
 Q("#live-model").textContent = ""
} else {
 Q("#info-state").removeAttribute("disabled")
 Q("#live-rid").textContent = SENDER.rid
 Q("#live-hash").innerHTML = RID.toHash(SENDER.rid) || "&nbsp;"
 Q("#live-model").textContent = serialize(SENDER.model)
}