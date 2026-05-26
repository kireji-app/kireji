declare interface IMesh<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 readonly getData(): IMeshData
 /** Casts a ray from the current mesh position along the force vector direction for the given delta time and returns a summary of the results. @param FORCE_VECTOR the force vector represent the position the uninterrupted ray will arrive at in one second. @param DELTA_TIME the duration of the time cast in seconds. @param ENABLE_SLIDING whether or not to enable the ray to "wrap" along the mesh boundary instead of stopping cold. */
 readonly castRay(FORCE_VECTOR: IVector3, DELTA_TIME: number, ENABLE_SLIDING: boolean): IMeshRayCastResult
 /** Checks if a point (x, y, z) rounds to a valid pixel within the specified tri's memoized row data. */
 readonly triContainsPoint(TRI_INDEX: IMeshTriIndex, POINT: IVector3): boolean
 /** Returns whether or not the given point is in a tri. @returns the index of the tri that contains the point. -1 otherwise. */
 readonly triThatContainsPoint(POINT: IVector3): IMeshTriIndex

 // Runtime Properties.
 /** The memoization data of every tri in the mesh, stored by tri index at build-time. */
 readonly triTable: IMeshTriData[]
 /** The index of the current tri in the mesh. */
 readonly triIndex?: IMeshTriIndex
 /** The current position of the state in the mesh. */
 readonly position: IVector3
 readonly manifest: IMeshManifest
 /** A cache of the pre-processed geometry data obtained by running the getData method. */
 readonly data: IMeshData
}

declare interface IMeshRayCastResult {
 /** Whether or not the ray hit the mesh boundary. */
 readonly hit: boolean
 /** The tri the ray most recently occupied when it hit the boundary or the index of the boundary where the ray stopped if there is no hit. */
 readonly triIndex: IMeshTriIndex
 /** The rounded cell position where the cast ray landed. */
 readonly point: IVector3
 /** The force vector used to cast the ray, which might be different from the input if sliding is enabled as it may point along the direction of the most recent sliding iteration. */
 readonly forceVector: IVector3
}

declare interface IMeshTriData {
 /** The original point array of the tri as taken from `mesh.getData()`. */
 readonly points: IMeshTriPoints
 /** The z-axis range of the tri. */
 readonly zRange: {
  /** The z position of the top-most row of the tri. */
  readonly min: number
  /** The z position of the bottom-most row of the tri. */
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


declare interface IMeshManifest
 extends IPartManifest {
 /** The available collision vertices as a flat array of 2D coordinates. Used for defining the world's collision tris. */
 readonly points: number[],
 /** The list of collision tris, as a flat array of point triples. Used to define the walkable area of the world. */
 readonly tris: number[]
}

declare type IMeshData = {
 readonly collision: [IMeshPoint[], IMeshTri[]]
}

declare type IMeshTri =
 [IMeshPointIndex, IMeshPointIndex, IMeshPointIndex]

declare type IMeshPointIndex =
 number

declare type IMeshTriPoints =
 [IMeshPoint, IMeshPoint, IMeshPoint]

declare type IMeshPoint =
 [x: number, y: number, z: number]

declare type IMeshTriIndex =
 number

declare type IMeshAny =
 IMesh<IPartAny>

declare const mesh: IMeshAny

declare const TRI: IMeshTriData