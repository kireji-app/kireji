declare interface IMesh<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 readonly getData(): IMeshData
 /** Casts a ray from the current mesh position along the force vector direction for the given delta time and returns a summary of the results. @param FORCE_VECTOR the force vector represent the position the uninterrupted ray will arrive at in one second. @param DELTA_TIME the duration of the time cast in seconds. @param ENABLE_SLIDING whether or not to enable the ray to "wrap" along the mesh boundary instead of stopping cold. */
 readonly castRay(FORCE_VECTOR: IVector2, DELTA_TIME: number, ENABLE_SLIDING: boolean): {
  /** Whether or not the ray hit the mesh boundary. */
  readonly hit: boolean
  /** The tri the ray most recently occupied when it hit the boundary or the index of the boundary where the ray stopped if there is no hit. */
  readonly triIndex: IMeshTriIndex
  /** The rounded cell position where the cast ray landed. */
  readonly position: IVector2
  /** The force vector used to cast the ray, which might be different from the input if sliding is enabled as it may point along the direction of the most recent sliding iteration. */
  readonly forceVector: IVector2
 }
 /** Checks if a point (x, y) rounds to a valid pixel within the specified tri's memoized row data. */
 readonly triContainsPoint(TRI_INDEX: IMeshTriIndex, POINT: IVector2): boolean
 /** Returns whether or not the given point is in a tri. @returns the index of the tri that contains the point. -1 otherwise. */
 readonly triThatContainsPoint(POINT: IVector2): IMeshTriIndex

 // Runtime Properties.
 /** The memoization data of every tri in the mesh, stored by tri index at build-time. */
 readonly triTable: IMeshTriData[]
 /** The index of the current tri in the mesh. */
 readonly triIndex?: IMeshTriIndex
 /** The current position of the state in the mesh. */
 readonly position: IVector2
}

declare interface IMeshTriData {
 /** The original point array of the tri as taken from `mesh.getData()`. */
 readonly points: IMeshTriPoints
 /** The y-axis range of the tri. */
 readonly range: {
  /** The y position of the top-most row of the tri. */
  readonly min: number
  /** The y position of the bottom-most row of the tri. */
  readonly max: number
 }
 /** The rows of pixels in the tri. */
 readonly rows: IMeshTriDataRow[]
 /** The offset of the tri in the overall mesh. */
 readonly offset: bigint
 /** The total number of pixels in the tri. */
 readonly cardinality: bigint
}

declare interface IMeshTriDataRow {
 /** The y position of this row of the tri's space. */
 readonly y: number
 /** The x-axis range of the row. */
 readonly range: {
  /** The smallest x position that is within the tri row. */
  readonly min: number
  /** The largest x position that is within the tri row. */
  readonly max: number
 }
 /** The bigint offset of this row in the overall tri. */
 readonly offset: bigint
}

declare type IMeshData = [IMeshPoint[], IMeshTri[]]

declare type IMeshTri =
 [IMeshPointIndex, IMeshPointIndex, IMeshPointIndex]

declare type IMeshPointIndex =
 number

declare type IMeshTriPoints =
 [IMeshPoint, IMeshPoint, IMeshPoint]

declare type IMeshPoint =
 [x: number, y: number]

declare type IMeshTriIndex =
 number

declare type IMeshAny =
 IMesh<IPartAny>

declare const mesh: IMeshAny

declare const TRI: IMeshTriData