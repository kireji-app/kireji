return Color.hexFromRGB(
 ...Color.blendRGB(
  Color.hexToRGB(COLOR_A),
  Color.hexToRGB(COLOR_B),
  MODE
 )
)