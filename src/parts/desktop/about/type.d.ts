declare interface IAboutApp
 extends IApp<IDesktop, null> {

 // Components.
 /** Generates the base64 body of a PNG image representing the pixel pie chart used for the vintage about screen. */
 readonly drawPie(WIDTH: number, HEIGHT: number, SLICES: IPieChartSlice[], CYLINDER_HEIGHT_FRACTION: number, PITCH_FRACTION: number, YAW_FRACTION: number, WALL_SHADE: number = 127): string
 /** A dynamically generated PNG image of a pie chart showing what percent of the max URL length is taken by the worst-case URL in the ecosystem. */
 readonly "pie-url-space.png": string
 /** A dynamically generated PNG image of a pie chart showing what percent of the max service worker size is taken by the ecosystem's service worker. */
 readonly "pie-offline-server.png": string
 /** The dynamic color swatches used for the vintage mode pie charts. */
 readonly "swatches": {
  readonly free: string
  readonly used: string
 }

 // Properties.
 /** The number of bytes consumed by the service worker script that inlines the repository so that it can be sent to the user's browser as a single network fetch. */
 readonly offlineServerByteCount: number
 /** The suggested maximum number of bytes that the service worker should be allowed to take up. */
 readonly offlineServerMaxBytes: number
 /** The percent obtained by dividing `AboutApp.offlineServerByteCount` by `AboutApp.offlineServerMaxBytes` */
 readonly offlineServerUsedPercent: number
 /** The host name of the longest public host in the ecosystem. */
 readonly longestHost: string
 /** A cache of the generated pie charts for the vintage view. These charts don't change at runtime so they are cached the first time they are created. */
 readonly imageCache: Record<string, string>
 /** The recommended maximum number of characters for a URL in the ecosystem. */
 readonly maxURLLength: number
 /** The URL created by appending the longest host to the pathname made from the last RID of the ecosystem. */
 readonly worstCaseURL: string
 /** The percent of the max URL length that is taken up by the worst-case URL in the ecosystem. */
 readonly urlUsedPercent: number
 /** The number of installed applications in the ecosystem, including the desktop. */
 readonly appCount: number
 /** If the user has checked the server for updates, this is the semantic version of the latest server release, as reported by the server. */
 readonly newVersion: string
}

declare interface IPieChartSlice {
 readonly color: RGBAColor
 readonly value: number
}

declare const AboutApp: IAboutApp
type AboutApp = T