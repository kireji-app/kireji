return /* html */`<canvas id="onscreen-canvas">
 Your browser does not support the HTML canvas tag.
</canvas>
${thisGLTFGame.manifest.debug ? thisGLTFGame.levels.arm["part.html"] : ""}
<section id=hud>${thisGLTFGame["hud.html"]}</section>
<section id=pause-menu>${thisGLTFGame["pause-menu.html"]}</section>`