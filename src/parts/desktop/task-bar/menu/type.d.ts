declare interface IMenu
 extends IMatch<IMenu, IMenuClip>,
 IWebView {

 // Subparts.
 /** The abstract part used for all the menu's clips which automatically plays the clips when the menu match arm is set. */
 readonly clip: IMenuClip
 /** A movie clip that represents the closed position. It plays once and freezes on its last frame. */
 readonly closed: IMenuClip
 /** The movie clip that tweens the menu from the closed position to the opened position. */
 readonly introduce: IMenuClip
 /** A movie clip that represents the opened position. It plays once and freezes on its last frame. */
 readonly opened: IMenuClip

 // Components.
 /** The array of classes that the menu wants to have applied to the body element. */
 readonly "classes": string[]
 /** The HTML that renders the menu button on the taskbar. */
 readonly "button.html": string
 /** The HTML that renders the desktop task menu, including some app links and settings. */
 readonly "menu.html": string
 /** The array of parts that should appear as items on the task menu. */
 readonly "items": IPartAny[]
 /** An event handler that advances the menu from its current clip into its next one. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void

 // Properties.
 /** On the client, the screen-filling element that contains the menu. If the menu is closed at hydration time, it will be rendered in an offscreen element so that it can be quickly shown later by adding it to the DOM. */
 readonly element: HTMLElement
 /** On the client, the button element that should open the task menu. */
 readonly button: HTMLElement
}

/** A type that generates an animated menu.
 * 
 * It contains three movie clips:
 * ```
 * [
 *   Menu.closed,
 *   Menu.introduce,
 *   Menu.opened
 * ]
 * ```*/
declare const Menu: IMenu
type Menu = T