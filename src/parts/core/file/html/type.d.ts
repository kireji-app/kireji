declare interface IHTML
 extends IPart<IFileUtils, null> {

 // Components.
 /** Makes the given text HTML attribute-friendly by escaping special characters using ampersand codes. */
 readonly sanitizeAttr(STRING: string): string
}

declare const HTML: IHTML
type HTML = T