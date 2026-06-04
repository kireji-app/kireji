declare interface IMenuClip
 extends IClip<IMenu> {

 // Components.
 /** The key for the clip which should play next when autoplaying the clip. */
 readonly "nextKey": string
 /** Returns the correct style attribute for the menu, computed from the clip's RID, allowing the current clip to drive the menu's css. */
 readonly "style": string
}

declare const thisMenuClip: IMenuClip
