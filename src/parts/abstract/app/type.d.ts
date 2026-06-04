declare interface IApp<TOwner, TFactor>
 extends IMix<TOwner, TFactor>,
 IAppDetails {

 // Components.
 /** An array of classes which the app wants to have applied to the body. */
 readonly "classes": string[]
 /** An object corresponding to any custom headers that the app would like to include in the final response for its index pages. */
 readonly "customHeaders": Record<string, string>
 /** A JSON-serialized map of hot-key combos that the app should listen to and the actions each combo should call. */
 readonly "hot-keys.json"
 /** The app's accent/hover color when dark mode is enabled. */
 readonly "darkAccentTheme": string
 /** The app's background color when dark mode is enabled. */
 readonly "darkBgTheme": string
 /** The app's foreground color when dark mode is enabled. */
 readonly "darkFgTheme": string
 /** The app's accent/hover color when the dark is disabled. */
 readonly "lightAccentTheme": string
 /** The app's background color when the dark is disabled. */
 readonly "lightBgTheme": string
 /** The app's foreground color when the dark is disabled. */
 readonly "lightFgTheme": string
 /** An optional menu title for showing apps in the taskbar menu. If undefined, the app's part title will be used instead. */
 readonly "titleMenu"?: string
 /** For SEO, an xml file detailing the app's available canonical links, which will be fetched by search engines. */
 readonly "sitemap.xml"
 /** Optional action that, when defined, converts the given human-readable, SEO-friendly canonical pathname to a stateful hash, using the current ecosystem state as the base state. */
 readonly translateCanonicalPathname?(PATHNAME: string, HASH?: string): string

 // Properties.
 /** The host element that contains the entire app. */
 readonly container: HTMLElement
}

declare interface IAppDetails
 extends IWebView {

 // Components.
 /** A string that impacts the way the current page of the app appears in search results. */
 readonly "canonicalPathname": string
 /** A passthrough description that becomes the app's overall description in search results when the current page of the app is active. */
 readonly "descriptionMeta": string
 /** The absolute URL to the current page of the app, depending on its substate. */
 readonly "canonicalURL": string
 /** The partial pathname or segment corresponding to the current page of the app. */
 readonly "pathname": string
 /** An optional string of attributes which will be added to the app host element. */
 readonly "attributes"?: string[]
 /** An optional string representing the style attribute of the app host element, which can be used for making quick (quicker than replacing part.css) changes to css variables. */
 readonly "style"?: string
 /** For SEO, the portion of the "sitemap.xml" file listing the app or app section's available canonical links. */
 readonly "urls.xml"
}

declare type IAppSubpart =
 IPart<IAppAny, IPartAny>

declare type IAppAny =
 IApp<ITopLevelDomainAny, IAppSubpart>

declare const thisApp: IAppAny