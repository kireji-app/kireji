return AboutApp.drawPie(
 122,
 62,
 [
  { color: AboutApp.swatches.used, value: AboutApp.worstCaseURL.length },
  { color: AboutApp.swatches.free, value: AboutApp.maxURLLength - AboutApp.worstCaseURL.length }
 ],
 0.175,
 0.0625,
 0.5,
 191
)