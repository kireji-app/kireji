if (DELTA)
 NEW_RID = (NEW_RID + thisPart.rid) % thisPart.cardinality

thisPart.distributeRID(NEW_RID, SKIP_RUNTIME_STATE_DISTRIBUTION)
thisPart[".."]?.collectRID([thisPart])

if (environment === "client") {
 if (!Client.hydrated) {

  if (thisPart !== _ || _.initialized)
   throw error(`attempt to set the ecosystem RID from another part or more than once during hydration`)

  _.distributeHydrateView()
 } else {
  thisPart.distributeRemoveView()
  thisPart[".."]?.collectRemoveView()

  thisPart[".."]?.collectAddView()
  thisPart.distributeAddView()

  thisPart[".."]?.collectUpdateView()
  thisPart.distributeUpdateView()
 }
}

thisPart.distributeClean()
thisPart[".."]?.collectClean()

if (!_.initialized)
 define(_, { initialized: { value: true } })