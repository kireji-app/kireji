const
 title = HTML.sanitizeAttr(_.openTask.title ?? "Untitled App"),
 icon = _.openTask.placeholderImage("part.png"),
 classes = [..._.openTask.classes],
 includeDesktop = _.includeDesktop === "demo" || (_.command === "debug" && (_.includeDesktop === "full" || _.includeDesktop === "local-only")),
 includeMenu = includeDesktop || _.includeDesktop === "menu-only" || _.includeDesktop === "full"

if (_.includeEra !== "none")
 classes.push(Era.arm.key)

if (_.includeColor !== 'none')
 classes.push(Color.arm.key)

if (includeMenu)
 classes.push(Menu.classes)

return _.injectImages(/* html */`<!DOCTYPE html>
<html lang=en>
 <head>
  <title>${title}</title>
  <meta name="format-detection" content="telephone=no, email=no, address=no, date=no">
  <meta name="description" content="${HTML.sanitizeAttr(_.openTask.descriptionMeta ?? "This app is coming soon.")}">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
  <!-- <meta name="theme-color" ... media="(prefers-color-scheme: light)"> -->
  <link class=favicon rel=icon href="${icon}"/>
  <link class=favicon rel="apple-touch-icon" href="${icon}"/>
  <link rel="canonical" href="https://${_.openTask.host}${_.openTask.canonicalPathname ?? "/"}" />
  <!-- <link rel="manifest"${OfflineServer.manifestLink}/> -->
  <style id="user-css">${_["part.css"]}</style>
  ${_.includeEra === "none" ? "" : /*html*/`<style id="era-css">${Era["part.css"]}</style>`}
  ${_.includeColor === "none" ? "" : /*html*/`<style id="color-css">${Color["part.css"]}</style>`}
  <style id="part-css">${_.openTask["part.css"]}</style>
 </head>
 <body class="unhydrated ${classes.join(" ")}">
  ${_.includeWarning === "enabled" ? /*html*/`<warning->🚧 App in Alpha. Features subject to change/break without notice.</warning->` : ""}
  ${includeDesktop ? `<title-bar autofocus tabIndex=0>
   <img class="part-icon" src="${icon}"/>
   <span id=part-title>${title}</span>
   <flex-spacer></flex-spacer>
   <button class=hide ${Windows.pointAttr("hidePoint")}></button>
   <button class=restore ${Windows.pointAttr("restorePoint")} disabled></button>
   <button class=close ${Windows.pointAttr("closePoint")}></button>
  </title-bar>` : ""}
  <wallpaper- class=app-container id=${_.openTask.host.replaceAll(".", "_")} tabIndex=0 ${_.openTask.attributes.join(" ")}>
  ${_.openTask["part.html"]}
  </wallpaper->
  <!-- windows -->
  ${includeMenu ? TaskBar["part.html"] : ""}
  ${OfflineServer["part.html"]}
 </body>
</html>`)