return `<tool-bar>${KirejiToolBar.map((item, index) =>
 `<button ${KirejiToolBar.pointAttr("point", index)}${item === KirejiToolBar.arm ? " data-active" : ""}>${item["part.svg"]}</button>`
).join("")}</tool-bar>`