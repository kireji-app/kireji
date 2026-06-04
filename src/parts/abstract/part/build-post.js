if (typeof thisPart.cardinality !== "bigint" || thisPart.cardinality <= 0)
 throw error(`invalid cardinality: ${thisPart.cardinality}`)