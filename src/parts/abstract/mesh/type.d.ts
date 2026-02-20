declare interface IMesh<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 readonly getData(): IMeshData
 /** Checks if a point (x, y) rounds to a valid pixel within the specified triangle's memoized row data. */
 readonly isPointInTriangle(POINT: IVector2, TRIANGLE: IMeshTriangle): boolean

 // Runtime Properties.
 readonly triangles: ITriangleMemoization[]
 readonly x?: number
 readonly y?: number
 readonly triangleIndex?: number
}

declare interface ITriangleMemoization {
 /** The original point array of this triangle as taken from `mesh.getData()`. */
 readonly points: IMeshTriangle
 /** The y position of the top-most row of the triangle. */
 readonly minY: number
 /** The y position of the bottom-most row of the triangle. */
 readonly maxY: number
 /** The rows of pixels in the triangle. */
 readonly rows: ITriangleMemoizationRow[]
 /** The offset of this triangle in the overall mesh. */
 readonly offset: bigint
 /** The total number of pixels in this triangle. */
 readonly cardinality: bigint
}

declare interface ITriangleMemoizationRow {
 /** The y position of this row of the triangle's space. */
 readonly y: number
 /** The smallest x position that is within the triangle row. */
 readonly xMin: number
 /** The largest x position that is within the triangle row. */
 readonly xMax: number
 /** The bigint offset of this row in the overall triangle. */
 readonly offset: bigint
}

declare type IMeshData =
 IMeshTriangle[]

declare type IMeshTriangle =
 [IMeshPoint, IMeshPoint, IMeshPoint]

declare type IMeshPoint =
 [x: number, y: number]

declare type IMeshAny =
 IMesh<IPartAny>

declare const mesh: IMeshAny

declare const TRIANGLE: ITriangleMemoization