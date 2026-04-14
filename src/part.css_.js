return /* css */`

html, body {
 --warning-height: ${+_.showWarning ? "26px" : "0px"};
}${+_.showWarning ? `

@media (width < 390px) {

 html,
 body {
  --warning-height: 49px;
 }
}` : ""}
` + _["static.css"]