declare interface IKirejiIssue
 extends IPart<IKirejiIssues, null>,
 IApplicationDetails {

 // Serialized Properties.
 readonly status: string
 readonly priority: string
 readonly affects: IPartAny[]
 readonly links: IKirejiIssue[]
 readonly "card.html": string
}

declare const kirejiIssue: IKirejiIssue