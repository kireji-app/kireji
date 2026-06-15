return (
 /* html */`<section class=update-control>
 <h2>Version</h2>
 <span class=version tabIndex=0>
  <span><span class="label">Framework:</span><a ${_.pointAttr()} class="external" href="https://www.npmjs.com/package/kireji/v/${_.kirejiVersion}">kireji ${_.kirejiVersion}</a></span>
  <span><span class="label">Ecosystem:</span><a ${_.pointAttr()} class="external" href="${_.gitHubRepo}/tree/${_.gitSHA}">${_.key} ${_.version}</a></span>
 </span>
 <button id=update-button ${AboutApp.pointAttr("updatePoint")}>Check for updates</button>
</section>` + (
  Era.arm === Era.modern ? /* html */`<div class="meters">
 <div class="meter-box offline-server">
   <h2>Offline Server</h2>
   <div class="meter-reading">${AboutApp.offlineServerUsedPercent}% <span>of ${AboutApp.offlineServerMaxBytes / 10 ** 3} KB</span></div>
   <div class="meter-track">
     <div class="meter-fill" style="width:${AboutApp.offlineServerUsedPercent}%;background:var(--accent)"></div>
   </div>
   <div class="meter-subline"><span>${(AboutApp.offlineServerByteCount / 1000).toFixed(0)} KB used</span><span>${((AboutApp.offlineServerMaxBytes - AboutApp.offlineServerByteCount) / 10 ** 3).toFixed(0)} KB free</span></div>
 </div>
 <div class="meter-box url-space">
   <h2>URL Space</h2>
   <div class="meter-reading">${AboutApp.urlUsedPercent}% <span>of ${AboutApp.maxURLLength} ch</span></div>
   <div class="meter-track">
     <div class="meter-fill" style="width:${AboutApp.urlUsedPercent}%;background:var(--accent)"></div>
   </div>
   <div class="meter-subline"><span>${AboutApp.worstCaseURL.length} ch used</span><span>${AboutApp.maxURLLength - AboutApp.worstCaseURL.length} ch free</span></div>
 </div>
</div>`  : /* html */`<section class="pie-charts">
 <section class="pie-chart offline-server">
  <h2>Offline Server</h2>
  <img src="${AboutApp.placeholderImage("pie-offline-server.png")}"/>
  <div class=legend><span class="swatch free" style="background-color:${AboutApp.swatches.free}"></span><span class="label">Free space:</span><span>${((AboutApp.offlineServerMaxBytes - AboutApp.offlineServerByteCount) / 10 ** 3).toFixed(0)} KB</span></div>
  <div class=legend><span class="swatch used" style="background-color:${AboutApp.swatches.used}"></span><span class="label">Used space:</span><span>${(AboutApp.offlineServerByteCount / 10 ** 3).toFixed(0)} KB</span></div>
  <div class=capacity><span class="label">Capacity:</span><span>${AboutApp.offlineServerMaxBytes / 10 ** 3} KB</span></div>
 </section>
 <section class="pie-chart url-space">
  <h2>URL Space</h2>
  <img src="${AboutApp.placeholderImage("pie-url-space.png")}"/>
  <div class=legend><span class="swatch free" style="background-color:${AboutApp.swatches.free}"></span><span class="label">Free space:</span><span>${AboutApp.maxURLLength - AboutApp.worstCaseURL.length} ch</span></div>
  <div class=legend><span class="swatch used" style="background-color:${AboutApp.swatches.used}"></span><span class="label">Used space:</span><span>${AboutApp.worstCaseURL.length} ch</span></div>
  <div class=capacity><span class="label">Capacity:</span><span>${AboutApp.maxURLLength} ch</span></div>
 </section>
</section>`
 )
)