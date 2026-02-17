if (DELTA)
 ROUTE_ID = (ROUTE_ID + part.routeID) % part.cardinality

part.distributeRouteID(ROUTE_ID)
part[".."]?.collectRouteID([part])

if (environment === "client") {
 if (!client.hydrated) {

  if (part !== _ || _.initialized)
   throw new Error(`Attempted to set the ecosystem route from the wrong part or more than once during hydration (called on ${part.host}).`)

  _.distributeHydrateView()
 } else {
  part.distributeRemoveView()
  part[".."]?.collectRemoveView()

  part[".."]?.collectAddView()
  part.distributeAddView()

  part[".."]?.collectUpdateView()
  part.distributeUpdateView()
 }
}

part.distributeClean()
part[".."]?.collectClean()

if (!_.initialized)
 _.define({ initialized: { value: true } })