declare interface IWalkable<TOwner>
 extends IPart<TOwner, null> {

 // Components.
 readonly getData(): IWalkableData
 /** Casts a ray from the current walkable position along the force vector direction for the given delta time and returns a summary of the results. @param FORCE_VECTOR the force vector represent the position the uninterrupted ray will arrive at in one second. @param DELTA_TIME the duration of the time cast in seconds. @param ENABLE_SLIDING whether or not to enable the ray to "wrap" along the walkable boundary instead of stopping cold. */
 readonly castRay(FORCE_VECTOR: Vector3, DELTA_TIME: number, ENABLE_SLIDING: boolean): IWalkableRayCastResult
 /** Checks if a point (x, y, z) rounds to a valid pixel within the specified tri's memoized row data. */
 readonly triContainsPoint(TRI_INDEX: IWalkableTriIndex, POINT: Vector3): boolean
 /** Returns whether or not the given point is in a tri. @returns the index of the tri that contains the point. -1 otherwise. */
 readonly triThatContainsPoint(POINT: Vector3): IWalkableTriIndex

 // Properties.
 /** The memoization data of every tri in the walkable, stored by tri index at build-time. */
 readonly triTable: IWalkableTriData[]
 /** The index of the current tri in the walkable. */
 readonly triIndex?: IWalkableTriIndex
 /** The current position of the state in the walkable. */
 readonly position: Vector3
 readonly manifest: IWalkableManifest
 /** A cache of the pre-processed geometry data obtained by running the getData action. */
 readonly data: IWalkableData
}

declare interface IWalkableRayCastResult {
 /** Whether or not the ray hit the walkable boundary. */
 readonly hit: boolean
 /** The tri the ray most recently occupied when it hit the boundary or the index of the boundary where the ray stopped if there is no hit. */
 readonly triIndex: IWalkableTriIndex
 /** The rounded cell position where the cast ray landed. */
 readonly point: Vector3
 /** The force vector used to cast the ray, which might be different from the input if sliding is enabled as it may point along the direction of the most recent sliding iteration. */
 readonly forceVector: Vector3
}

declare interface IWalkableTriData {
 /** The original point array of the tri as taken from `walkable.getData()`. */
 readonly points: IWalkableTriPoints
 /** The z-axis range of the tri. */
 readonly zRange: {
  /** The z position of the top-most row of the tri. */
  readonly min: number
  /** The z position of the bottom-most row of the tri. */
  readonly max: number
 }
 /** The rows of pixels in the tri. */
 readonly rows: IWalkableTriDataRow[]
 /** The offset of the tri in the overall walkable. */
 readonly offset: bigint
 /** The total number of pixels in the tri. */
 readonly cardinality: bigint
}

declare interface IWalkableTriDataRow {
 /** The z position of this row of the tri's space. */
 readonly z: number
 /** The x-axis range of the row stored with the corresponding y-axis coordinate at those two points. */
 readonly xyRange: {
  /** The smallest x position that is within the tri row. */
  readonly min: {
   readonly x: number,
   readonly y: number
  }
  /** The largest x position that is within the tri row. */
  readonly max: {
   readonly x: number,
   readonly y: number
  }
 }
 /** The bigint offset of this row in the overall tri. */
 readonly offset: bigint
 /** The number of points in the given row. */
 readonly cardinality: bigint
}


declare interface IWalkableManifest
 extends IPartManifest {
 /** The available walkable vertices as a flat array of 2D coordinates. Used for defining the world's walkable tris. */
 readonly points: number[],
 /** The list of walkable triangles, as a flat array of point triples. Used to define the walkable area of the world. */
 readonly tris: number[]
}

declare type IWalkableData = {
 readonly walkable: [IWalkablePoint[], IWalkableTri[]]
}

declare type IWalkableTri =
 [IWalkablePointIndex, IWalkablePointIndex, IWalkablePointIndex]

declare type IWalkablePointIndex =
 number

declare type IWalkableTriPoints =
 [IWalkablePoint, IWalkablePoint, IWalkablePoint]

declare type IWalkablePoint =
 [x: number, y: number, z: number]

declare type IWalkableTriIndex =
 number

declare type IWalkableAny =
 IWalkable<IPartAny>

declare const thisWalkable: IWalkableAny

declare const TRI: IWalkableTriData