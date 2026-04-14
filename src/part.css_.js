const
 includeWarning = _.includeWarning === "enabled",
 includeDesktop = _.includeDesktop === "demo" || (!production && (_.includeDesktop === "full" || _.includeDesktop === "local-only"))

return /* css */`

html, body {
 --warning-height: ${includeWarning ? "26px" : "0px"};
 ${includeDesktop ? "" : `--title-bar-height: 0px !important;
 --task-bar-height: 0px !important;`}
}${includeWarning ? `

@media (width < 390px) {

 html,
 body {
  --warning-height: 49px;
 }
}` : ""}
` + _["static.css"]