declare interface IColor
 extends IMatch<IDesktop, IBodyMode<IColor>>,
 IWebView {

 // Subparts.
 readonly light: IBodyMode<IColor>
 readonly dark: IBodyMode<IColor>

 // Components.
 readonly "lightEstAccent": string
 readonly "lightErAccent": string
 readonly "lightAccent": string
 readonly "accent": string
 readonly "darkAccent": string
 readonly "darkErAccent": string
 readonly "darkEstAccent": string
 readonly "unLightEstAccent": string
 readonly "unLightErAccent": string
 readonly "unLightAccent": string
 readonly "unAccent": string
 readonly "unDarkAccent": string
 readonly "unDarkErAccent": string
 readonly "unDarkEstAccent": string
 readonly "modeEstAccent": string
 readonly "modeErAccent": string
 readonly "modeAccent": string
 readonly "unModeAccent": string
 readonly "unModeErAccent": string
 readonly "unModeEstAccent": string
 readonly "lightEstFg": string
 readonly "lightErFg": string
 readonly "lightFg": string
 readonly "fg": string
 readonly "darkFg": string
 readonly "darkErFg": string
 readonly "darkEstFg": string
 readonly "modeEstFg": string
 readonly "modeErFg": string
 readonly "modeFg": string
 readonly "unModeFg": string
 readonly "unModeErFg": string
 readonly "unModeEstFg": string
 readonly "lightEstBg": string
 readonly "lightErBg": string
 readonly "lightBg": string
 readonly "bg": string
 readonly "darkBg": string
 readonly "darkErBg": string
 readonly "darkEstBg": string
 readonly "modeEstBg": string
 readonly "modeErBg": string
 readonly "modeBg": string
 readonly "unModeBg": string
 readonly "unModeErBg": string
 readonly "unModeEstBg": string
 /** Returns true if the ecosystem is in light mode. */
 readonly "isLight": boolean
 /** Converts a hex string to a 3-component RGB value array. */
 readonly hexToRGB(HEX: string): RGBColor
 /** Converts three RGB component values to a single hex string. */
 readonly hexFromRGB(...rgb: RGBColor): string
 /** Blends hex color COLOR_A with hex color COLOR_B using the given MODE.
  * 
  * The default MODE is "screen". */
 readonly blendHex(COLOR_A: string, COLOR_B: string, MODE?: BlendMode): string
 /** Blends RGB color COLOR_A with RGB color COLOR_B using the given MODE. COLOR_B is allowed to be a number in the range [0, 255], in which case it is interpreted as a shade of grey.
  * 
  * The default MODE is "screen". */
 readonly blendRGB(COLOR_A: RGBColor, COLOR_B: RGBColor | number, MODE?: BlendMode): RGBColor
}

declare const Color: IColor
type Color = T

declare type RGBColor = [R: number, G: number, B: number]
declare type RGBAColor = [R: number, G: number, B: number, A: number]
declare type BlendMode = "screen" | "average" | "multiply"