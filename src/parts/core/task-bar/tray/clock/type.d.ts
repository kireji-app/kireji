declare interface IClock
 extends ITrayItem {

 // Components.
 /** A locale string of the clock time currently displayed in the taskbar tray. */
 readonly "time": string
}

declare const Clock: IClock
type Clock = T