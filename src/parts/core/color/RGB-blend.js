if (!(Array.isArray(COLOR_A) || COLOR_A.length !== 3 || COLOR_A.some(component => typeof component !== "number")))
 throw error("COLOR_A must be an array of three numbers")

if (typeof COLOR_B === "number")
 COLOR_B = [COLOR_B, COLOR_B, COLOR_B]
else if (!(Array.isArray(COLOR_B) || COLOR_B.length !== 3 || COLOR_B.some(component => typeof component !== "number")))
 throw error("COLOR_B must be a number or an array of three numbers")

return COLOR_A.map((n, i) => {

 const m = COLOR_B[i]
 const k = 255

 switch (MODE) {

  case "average":
   return (n + m) / 2

  case "multiply":
   return (n * m) / k

  case "screen":
   return k - (((k - n) * (k - m)) / k)

  default:
   throw error(`unsupported blend mode "${MODE}"`)
 }
})