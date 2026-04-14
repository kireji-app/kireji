const includeDesktop = _.includeDesktop === "demo" || (!production && (_.includeDesktop === "full" || _.includeDesktop === "local-only"))

return `<task-bar tabIndex=0>${taskBar.menu["part.html"]}${includeDesktop ? windows.instances.map((window, index) => windows.renderTaskHTML(window, index)).join("") : ""}<flex-spacer></flex-spacer>${includeDesktop ? taskBar.tray["part.html"] : ""}</task-bar>`