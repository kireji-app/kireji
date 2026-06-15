return AboutApp.drawPie(
 122,
 62,
 [
  { color: AboutApp.swatches.used, value: AboutApp.offlineServerByteCount },
  { color: AboutApp.swatches.free, value: AboutApp.offlineServerMaxBytes - AboutApp.offlineServerByteCount },
 ],
 0.175,
 0.0625,
 0.5,
 191
)