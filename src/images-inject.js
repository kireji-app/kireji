let injection

const [headHTML, bodyHTML] = HTML_DOCUMENT.split(/\s*<\/head>\s*/)

if (environment.startsWith("node")) {

 const bodyDeclarations = []
 const earlies = {}

 for (const [, host, filename] of bodyHTML.matchAll(/data:image\/svg\+xml;inert;(.+?)\/(.+?),/g))
  (earlies[host] ??= new Set()).add(filename)

 for (const [, host, filename] of headHTML.matchAll(/var\(--(.+?)--(.+?)\)/g))
  (earlies[host.replaceAll("-", ".").replaceAll("_", "-")] ??= new Set()).add(filename.replace("-", ".").replaceAll("_", "-"))

 injection = /* html */`<style id="img-css"></style>
  <style id="early-img-css">${earlyImageSources.map(([owner, filename]) => {
  if (earlies[owner.host]?.has(filename)) {
   const varName = `--${owner.host.replaceAll("-", "_").replaceAll(".", "-")}--${filename.replaceAll("-", "_").replaceAll(".", "-")}`
   /* Valid for .png, .gif and .jpeg files only */
   bodyDeclarations.push(`${varName}: url(data:image/${filename.slice(-3)};base64,${owner["early-" + filename]});`)
   return /* css */`img[src*=";${owner.host}/${filename}"] { background: var(${varName}); background-size: 100%; animation: none }`
  }
  return ""
 }).join("") +
  `body {\n ${bodyDeclarations.join("\n ")}\n}`}</style>`
} else {
 injection = /* html */`<style id="img-css">${_["images.css"]}</style>`
}

return /* html */`${headHTML}
  ${injection}
 </head>
 ${bodyHTML}`