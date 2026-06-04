declare interface IMatch<TOwner, TArm>
 extends IPart<TOwner, TArm> {

 // Properties.
 /** The subpart which is currently chosen. */
 readonly arm?: TArm
 /** A map storing the arm position offsets. */
 readonly offsets?: Map<TArm, bigint>
}

declare type IMatchAny =
 IMatch<IPartAny, IMatchArm>

declare type IMatchArm =
 IPart<IMatchAny, IPartAny>

declare const thisMatch: IMatchAny

declare const ARMS: IMatchArm[]