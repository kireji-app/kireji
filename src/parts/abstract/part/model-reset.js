let landingModel = _.landingModel

for (const domain of [...thisPart.domains].reverse()) {
 if (domain in landingModel)
  landingModel = landingModel[domain]
 else {
  thisPart.setRID(0n)
  return
 }
}

thisPart.setModel(landingModel)