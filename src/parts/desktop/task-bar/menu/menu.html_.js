const
 controls = [],
 sections = []

controls.push(AboutApp["menu-item.html"])

if (_.includeColor === "full" || (_.command === "debug" && _.includeColor.startsWith("debug-")))
 controls.push(Color["part.html"])

if (_.includeEra === "full" || (_.command === "debug" && _.includeEra.startsWith("debug-")))
 controls.push(Era["part.html"])

if (_.includeMenuItems === "full" || (_.command === "debug" && _.includeMenuItems === "local-only"))
 sections.push(`<ul id=app-control>${Menu.items.map(app => {
  const isCurrentOpenPart = app === _.openTask
  return `
 <li class=task-link${isCurrentOpenPart ? ` data-here` : ""}>
  <a ${isCurrentOpenPart ? "" : _.pointAttr()} href=https://${app.host}>
   <img src="${app.placeholderImage("part.png")}" class=part-icon />
   <span class=label>${app.titleMenu ?? app.title}</span>
  </a>
 </li>`
 }).join("")}</ul>`)

if (controls.length)
 sections.push(`\n <hr>\n <section id="settings">${controls.join(`\n  `)}</section>`)

return `<task-menu style="${Menu.arm.style}">${sections.join(`\n `)}</task-menu>`