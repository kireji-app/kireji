declare interface IBitmask<TOwner, TSubject>
 extends IPart<TOwner, null> {

 // Components.
 /** An optional action that takes in a single subject and returns an array of zero or more child subjects that should parented to it in the node forest. @remarks Must be combined with the `rootSubjects` component. */
 readonly getChildSubjects(BITMASK_NODE: IBitmaskNode<TSubject>): IPartAny[]
 /** The array of subjects which act as the root nodes when generating the forest. @remarks If `getChildSubjects` is not defined, the mask will be a flat array of root nodes. */
 readonly "rootSubjects": TSubject
 /** Takes in a node and returns a JSON-friendly model that can be used to identify the node or null if the node is not part of the bitmask. */
 readonly getModelFromNode(BITMASK_NODE: IBitmaskNode<TSubject>): any
 /** Takes in a JSON-friendly model and returns the corresponding node or null if a corresponding node does not exists. */
 readonly getNodeFromModel(MODEL: any): IBitmaskNode<TSubject> | null

 // Properties.
 readonly manifest: IBitmaskManifest
 /** A map that can be used to recover a bitmask node from a subject. */
 readonly nodesBySubject: Map<TSubject, IBitmaskNode<TSubject>>
 /** The complete list of nodes, whether they are masked by this part or not. */
 readonly nodeList: IBitmaskNode<TSubject>[]
 /** The list of masked nodes, used to treat the part's RID as a bitmask that stores each subject's inclusion. */
 readonly maskedNodeList: IBitmaskNode<TSubject>[]
 /** The array of currently included nodes, determined by parsing the RID as a bitmask/superset index. Only masked nodes can appear in this set. */
 readonly selectedNodes: Set<IBitmaskNode<TSubject>>
}

declare interface IBitmaskNode<TSubject>
 extends Map<TSubject, IBitmaskNode<TSubject>> {

 /** The subject of the node. */
 readonly subject: TSubject
 /** Whether or not the node has any child nodes. */
 readonly isLeaf: boolean
 /** The index of the node in the list of all nodes. */
 readonly index: number
 /** The index of the node in the masked node list. */
 readonly maskIndex: number
 /** The node's parent node or `null` if this is the root node. */
 readonly parentNode?: IBitmaskNode<TSubject>
}

declare interface IBitmaskManifest
 extends IPartManifest {

 /** If true, the bitmask will not establish bits for leaf nodes. @remarks If the `getChildSubjects` component is not defined, this will create a bitmask with no maskable nodes and a warning will be issued at build time. */
 readonly ignoreLeaves?: boolean
}

declare const thisBitmask: IBitmask<IPartAny, any>
declare const BITMASK_NODE: IBitmaskNode<any>