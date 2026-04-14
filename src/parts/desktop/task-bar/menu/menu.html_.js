const
 controls = [],
 sections = []

if (_.includeUpdates === "full" || (!production && _.includeUpdates === "local-only"))
 controls.push(update["part.html"])

if (_.includeColor === "full" || (!production && _.includeColor.startsWith("debug-")))
 controls.push(color["part.html"])

if (_.includeEra === "full" || (!production && _.includeEra.startsWith("debug-")))
 controls.push(era["part.html"])

if (_.includeMenuApps === "full" || (!production && _.includeMenuApps === "local-only"))
 sections.push(`<ul id=application-control>${Object.entries(_.menuApplications).map(([host, application]) => {
  const isCurrentApplication = application === _.application
  return `
 <li class=task-link${isCurrentApplication ? ` data-here` : ""}>
  <a ${isCurrentApplication ? "" : _.pointAttr()} href=https://${host}>
   <img src="${application.placeholderImage("part.png")}" class=part-icon />
   <span class=label>${application.titleMenu ?? application.title}</span>
  </a>
 </li>`
 }).join("")}</ul>`)

if (controls.length)
 sections.push(`\n <hr>\n <section id="settings">${controls.join(`\n  `)}</section>`)

return `<task-menu style="${menu.arm.style}">${sections.join(`\n `)}</task-menu>`