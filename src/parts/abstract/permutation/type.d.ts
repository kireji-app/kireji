declare interface IPermutation<TOwner, TInstance, TModel, TSubject>
 extends IPart<TOwner, null> {

 // Components.
 /** Returns the specific permutation ID of the given array of instances without changing the state of the part. */
 readonly getPermutationRID(INSTANCES: TInstance[]): bigint
 /** Returns the specific payload ID of the given array of instances without changing the state of the part. */
 readonly getPayloadRID(INSTANCES: TInstance[]): bigint
 /** Returns the place value (unit multiplier) of the given index for the given instance count. */
 readonly getPermutationFactor(INSTANCE_COUNT: bigint, CURRENT_INSTANCE_INDEX: bigint): bigint
 /** Sets the part's RID based on the current distributed instance data by adding and multiplying cached properties, recomputing them if RECOMPUTE_INSTANCES is true. */
 readonly recomputeRID(RECOMPUTE_INSTANCES: boolean = false): bigint
 /** Takes the instance-specific recovered subject index and payload RID and returns an instance. */
 readonly distributeInstanceRID(SUBJECT_INDEX: bigint, NEW_RID: bigint): TInstance
 /** Takes the given instance and turns it into a payload RID which will then be mixed with the permutation's combined payload RID. */
 readonly collectInstanceRID(SUBJECT_INDEX: bigint, NEW_RID: bigint): TInstance
 /** Takes the given instance and returns its correspoding subject which can then be indexed and ranked to determine the permutation RID. */
 readonly instanceToSubject(INSTANCE: TInstance): bigint | number
 /** Returns the full array of subjects from which the permutation will be made. It will then be cached as `permutation.superset`. */
 readonly getSuperset(): TSubject[]
 /** Transforms a given instance into its model. */
 readonly instanceToModel(INSTANCE: TInstance): TModel
 /** Transform a state model into an instance. This is used in order to consistently compute the RID of a given data model. */
 readonly instanceFromModel(MODEL: TModel): TInstance

 // Properties.
 readonly instanceOffsets: bigint[]
 readonly instanceBitDepths: bigint[]
 readonly permutationSizes: bigint[]
 readonly payloadCardinality: bigint
 readonly payloadSizes: bigint[]
 readonly superset: TSubject[]
 readonly supersetSize: bigint
 /** The maximum number of instances that can exist at one time. */
 readonly maxInstanceCount: bigint
 /** A subindex representing which permutation of k instances is assigned. */
 readonly permutationRID: bigint
 /** The most recent permutation RID, used to quickly determine if the instance arrangement has changed since the last view population. @remarks Client-only */
 readonly viewedPermutationRID?: bigint
 /** A subindex representing the combined per-instance payload data for the k instances. */
 readonly payloadRID: bigint
 /** The distributed instance data. */
 readonly instances: TInstance[]
 /** The set of viewed instance objects corresponding to the current `thisPart.viewedPermutationRID`. @remarks Client-only */
 readonly viewedInstances: TInstance[]
 /** A Fenwick tree that allows performant ranking and unranking of permutation indices. */
 readonly tree: FenwickTree
}

declare type IPermutationAny =
 IPermutation<IPart<IPermutationAny, IPartAny>, any, any, any>

declare const thisPermutation: IPermutationAny