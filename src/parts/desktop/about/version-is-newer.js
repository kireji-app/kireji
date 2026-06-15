if (typeof INCOMING_VERSION !== "string")
 throw error(`version argument must be a string`)

const incoming = INCOMING_VERSION.split(".")

if (incoming.length !== 3)
 throw error(`version "${INCOMING_VERSION}" is not formatted correctly`)

const current = _.version.split(".")

for (let i = 0; i < 3; i++) {
 const a = +current[i]
 const b = +incoming[i]

 if (isNaN(b))
  throw error(`version "${INCOMING_VERSION}" is not formatted`)

 if (a !== b)
  return b > a
}

return false