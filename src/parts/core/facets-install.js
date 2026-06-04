const gate = Promise.withResolvers()

const promiseArray = []

for (const facet of Core) {
 if (facet.prototype.host === "facet.abstract.parts") {
  facet.install(gate)
  promiseArray.push(facet.promise)
 }
}

gate.resolve(promiseArray)