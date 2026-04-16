declare interface IKirejiIssue
 extends IPart<IKirejiIssues, null>,
 IApplicationDetails {

 // Serialized Properties.
 readonly status: string
 readonly priority: string
 readonly affects: IPartAny[]
 readonly links: IKirejiIssue[]
 readonly "card.html": string
 /** Outputs unix timestamps as a human-readable date, for consistent date formats across the notebook. */
 readonly niceDate(UNIX_TIMESTAMP: string | number): string
}

declare const kirejiIssue: IKirejiIssue