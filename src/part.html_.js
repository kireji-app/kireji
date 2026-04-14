const
 title = sanitizeAttr(application.title ?? "Untitled App"),
 icon = application.placeholderImage("part.png"),
 classes = [...application.classes],
 includeDesktop = _.includeDesktop === "demo" || (!production && (_.includeDesktop === "full" || _.includeDesktop === "local-only")),
 includeMenu = includeDesktop || _.includeDesktop === "menu-only" || _.includeDesktop === "full"

if (_.includeEra !== "none")
 classes.push(era.arm.key)

if (_.includeColor !== 'none')
 classes.push(color.arm.key)

if (includeMenu)
 classes.push(taskBar.menu.classes)

return _.injectImages(/* html */`<!DOCTYPE html>
<html lang=en>
 <head>
  <title>${title}</title>
  <meta name="format-detection" content="telephone=no, email=no, address=no, date=no">
  <meta name="description" content="${sanitizeAttr(application.descriptionMeta ?? "This app is coming soon.")}">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
  <!-- <meta name="theme-color" ... media="(prefers-color-scheme: light)"> -->
  <link class=favicon rel=icon href="${icon}"/>
  <link class=favicon rel="apple-touch-icon" href="${icon}"/>
  <link rel="canonical" href="https://${application.host}${application.canonicalPathname ?? "/"}" />
  <!-- <link rel="manifest"${worker.manifestLink}/> -->
  <style id="user-css">${_["part.css"]}</style>
  ${_.includeEra === "none" ? "" : /*html*/`<style id="era-css">${era["part.css"]}</style>`}
  ${_.includeColor === "none" ? "" : /*html*/`<style id="color-css">${color["part.css"]}</style>`}
  <style id="application-css">${application["part.css"]}</style>
 </head>
 <body class="unhydrated ${classes.join(" ")}">
  ${_.includeWarning === "enabled" ? /*html*/`<warning->🚧 App in Alpha. Features subject to change/break without notice.</warning->` : ""}
  ${includeDesktop ? `<title-bar autofocus tabIndex=0>
   <img class="part-icon" src="${icon}"/>
   <span id=application-title>${title}</span>
   <flex-spacer></flex-spacer>
   <button class=hide ${windows.pointAttr("hidePoint")}></button>
   <button class=restore ${windows.pointAttr("restorePoint")} disabled></button>
   <button class=close ${windows.pointAttr("closePoint")}></button>
  </title-bar>` : ""}
  <wallpaper- class=app-container id=${application.host.replaceAll(".", "_")} tabIndex=0 ${application.attributes.join(" ")}>
  ${application["part.html"]}
  </wallpaper->
  <!-- windows -->
  ${includeMenu ? taskBar["part.html"] : ""}
  ${worker["part.html"]}
 </body>
</html>`)