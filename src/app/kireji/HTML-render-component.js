const { kind, name, size, filename } = COMPONENT_OWNER.components[COMPONENT_KEY]

return /* html */`
<button ${KirejiEditor.pointAttr("point", allParts.indexOf(COMPONENT_OWNER), COMPONENT_OWNER.filenames.indexOf(filename))}>
 <span class=icon>${kind === "getter" ? "✧" : (kind === "action" ? (filename.startsWith("async-") ? "⟳" : "ƒ") : "≡")}</span>
 <span class="${kind}${filename in (COMPONENT_OWNER.prototype ?? {}) ? " override" : "own"}">${name}</span>
 ${filename.startsWith("async-") ? /* html */`<span class=async-icon>&nbsp;Async</span>` : ""}
 ${size ? /* html */`<span class=size>${size.toLocaleString()} B</span>` : ""}
</button>`