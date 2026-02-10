const cardinality = part.cardinality
const cardinalityAsString = instances.includes(part) ? cardinality.toString() : null
return cardinalityAsString.length < 16 ? `<math><mn>${cardinalityAsString}</mn></math>` : scientific(cardinality, true)