declare interface IKirejiIssueCommandPalette
 extends IPart<IKirejiIssuesActiveOverlay, null> {

 // Properties.
 /** Whether or not the command palette dropdown is currently active. */
 readonly hasDropdown: boolean
}

declare const KirejiIssueCommandPalette: IKirejiIssueCommandPalette
type KirejiIssueCommandPalette = T