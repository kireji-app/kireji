const cardinality = thisPart.cardinality
const cardinalityAsString = thisPart.isInstance ? cardinality.toString() : null
return [cardinalityAsString.length < 16 ? `<mn>${cardinalityAsString}</mn>` : RID.toScientific(cardinality, true).slice(6, -7).split("<mo>&sdot;</mo>").flatMap(term => [term, "<mo>&sdot;</mo>"]).slice(0, -1)]