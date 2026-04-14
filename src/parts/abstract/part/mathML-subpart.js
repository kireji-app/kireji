const cardinality = part.cardinality
const cardinalityAsString = instances.includes(part) ? cardinality.toString() : null
return [cardinalityAsString.length < 16 ? `<mn>${cardinalityAsString}</mn>` : scientific(cardinality, true).slice(6, -7).split("<mo>&sdot;</mo>").flatMap(term => [term, "<mo>&sdot;</mo>"]).slice(0, -1)]