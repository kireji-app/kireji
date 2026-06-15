const component = COMPONENT_OWNER.components[COMPONENT_KEY]
const { kind, name, size, filename } = component
const subjectIndex = kind === "file" ? component.subjectIndex : COMPONENT_OWNER.components[filename].subjectIndex

return /* html */`
<button ${KirejiEditor.pointAttr("point", subjectIndex)}>
 <span class=icon>${kind === "getter" ? "✧" : (kind === "action" ? (filename.startsWith("async-") ? "⟳" : "ƒ") : "≡")}</span>
 <span class="${kind}${filename in (COMPONENT_OWNER.prototype ?? {}) ? " override" : "own"}">${name}</span>
 ${filename.startsWith("async-") ? /* html */`<span class=async-icon>&nbsp;Async</span>` : ""}
 ${size ? /* html */`<span class=size>${size.toLocaleString()} B</span>` : ""}
</button>`