const includeDesktop = _.includeDesktop === "demo" || (_.command === "debug" && (_.includeDesktop === "full" || _.includeDesktop === "local-only"))

return `<task-bar tabIndex=0>${Menu["part.html"]}${includeDesktop ? Windows.instances.map((window, index) => Windows.renderTaskHTML(window, index)).join("") : ""}<flex-spacer></flex-spacer>${includeDesktop ? Tray["part.html"] : ""}</task-bar>`