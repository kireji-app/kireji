let resultingRouteID = 0n

resultingRouteID += BigInt(INSTANCE.height)
resultingRouteID *= 2000n

resultingRouteID += BigInt(INSTANCE.width)
resultingRouteID *= 2000n

resultingRouteID += BigInt(INSTANCE.left)
resultingRouteID *= 2000n

resultingRouteID += BigInt(INSTANCE.top)

return resultingRouteID