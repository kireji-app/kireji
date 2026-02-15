let owner = part

while (owner && !Object.hasOwn(owner.manifest, PROPERTY_KEY))
 owner = owner.prototype

return owner