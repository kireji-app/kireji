let landingModel = _.landingModel

for (const domain of [...part.domains].reverse()) {
 if (domain in landingModel)
  landingModel = landingModel[domain]
 else {
  part.setRouteID(0n)
  return
 }
}

part.setModel(landingModel)