const myLandingModel = thisGLTFGame.domains.reduceRight((model, domain) => model[domain] ?? {}, _.landingModel)
const landingRID = thisGLTFGame.modelToRID(myLandingModel)
const isLandingRID = thisGLTFGame.rid === landingRID

return /* html */`<h1>${thisGLTFGame.title}</h1>` + (isLandingRID ? /* html */`
<button ${thisGLTFGame.pointAttr("playPoint")}>Campaign</button>
<button disabled></button>
` : /* html */`
<button ${thisGLTFGame.pointAttr("playPoint")}>Resume Game</button>
<button ${thisGLTFGame.pointAttr("restartPoint")}>Restart Level</button>
`) + (/* html */`
<button disabled ${thisGLTFGame.pointAttr("settingsPoint")}>Settings (Coming Soon)</button>
<button disabled ${thisGLTFGame.pointAttr("creditsPoint")}>Credits (Coming Soon)</button>
<button ${Windows.pointAttr("closePoint")}>Quit</button>
`)