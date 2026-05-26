const menuApplicationsCount = Object.keys(_.menuApplications).length
const controlLinesCount = 3
const separatorCount = 1
return part["static.css"] + `
task-menu::after {
 content: "${_.application.fancyTitle}";
}
body {
 --sidebar-height: min(calc(((var(--icon-size) + (2px * 2)) * ${menuApplicationsCount}) + (28px * ${controlLinesCount}) + (3px * 2) + ${separatorCount} * ((4px * 2) + 2px)), calc(var(--h) - var(--bottom)));
}`