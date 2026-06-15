declare interface IComingSoonApp<TOwner> extends IErrorApp<TOwner> {

 // Components.
 /** An optional unix timestamp representing the date when the app is expected to be available. Search engine crawlers may return on this day to retry indexing the page. */
 readonly "launchTimestamp"?: string | number
}

declare type IComingSoonAppAny =
 IComingSoonApp<IPartAny>

declare const thisComingSoonApp: IComingSoonAppAny