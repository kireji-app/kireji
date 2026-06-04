let resultingRID = 0n

resultingRID += BigInt(INSTANCE.height)
resultingRID *= 2000n

resultingRID += BigInt(INSTANCE.width)
resultingRID *= 2000n

resultingRID += BigInt(INSTANCE.left)
resultingRID *= 2000n

resultingRID += BigInt(INSTANCE.top)

return resultingRID