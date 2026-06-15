const bodyDeclarations = []

return (
 imageSources.map(file => {
  const filename = file.key
  const varName = `--${file.owner.host.replaceAll("-", "_").replaceAll(".", "-")}--${filename.replaceAll("-", "_").replaceAll(".", "-")}`
  bodyDeclarations.push(`${varName}: url(data:image/${filename.slice(-3)};base64,${file.owner[file.key]});`)
  return `\n img[src*=";${file.owner.host}/${filename}"] { background: var(${varName}); background-size: 100%; animation: none }`
 }).join("") +
 `body {\n ${bodyDeclarations.join("\n ")}\n}`
)