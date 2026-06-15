return /* html */`<section class=about>
 <h1>${thisPartExplorer.title}</h1>
 <p>${thisPartExplorer.description}</p>
</section>
<section class=parts>${thisPartExplorer.partScroller.wrap(thisPartExplorer.subjects.map(childPart => {

 return /* html */`
 <button class=part-tile>
  <img src="${childPart.placeholderImage("part.png")}"/>
  <h2>${childPart.key}</h2>
 </button>`
}).join(""))}
</section>`