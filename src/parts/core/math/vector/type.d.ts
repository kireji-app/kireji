declare interface IVector {

 // Components.
 /** Creates a 2D vector. */
 readonly 2(x: number = 0, y: number = 0): Vector2
 /** Creates a 2D vector. */
 readonly xy(x: number = 0, y: number = 0): Vector2
 /** Creates a 2D vector. */
 readonly rg(r: number = 0, g: number = 0): Vector2
 /** Creates a 2D vector. */
 readonly uv(u: number = 0, v: number = 0): Vector2
 /** Creates a 3D vector. */
 readonly 3(x: number = 0, y: number = 0): Vector3
 /** Creates a 3D vector. */
 readonly xyz(x: number = 0, y: number = 0, z: number = 0): Vector3
 /** Creates a 3D vector. */
 readonly rgb(r: number = 0, g: number = 0, b: number = 0): Vector3
 /** Creates a 3D vector. */
 readonly uvp(u: number = 0, v: number = 0, p: number = 0): Vector3
 /** Creates a 4D vector. */
 readonly 4(x: number = 0, y: number = 0): Vector3
 /** Creates a 4D vector. */
 readonly xyzw(x: number = 0, y: number = 0, z: number = 0, w: number = 0): Vector4
 /** Creates a 4D vector. */
 readonly rgba(r: number = 0, g: number = 0, b: number = 0, a: number = 0): Vector4
 /** Creates a 4D vector. */
 readonly uvpq(u: number = 0, v: number = 0, p: number = 0, q: number = 0): Vector4

 /** Provides the length of the line connecting VECTOR_OR_NUMBER to the origin. Returns a number. */
 readonly magnitude(VECTOR_OR_NUMBER: number | Vector2 | Vector3 | Vector4): number
 /** Normalizes VECTOR_OR_NUMBER so that its magnitude is exactly 1. Returns a result of the same dimension. */
 readonly normalize<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector
 /** Returns the component-wise sign of VECTOR_OR_NUMBER. Returns a result of the same dimension. */
 readonly sign<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector
 /** Returns a copy of VECTOR_OR_NUMBER with all components rounded down. */
 readonly floor<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector
 /** Returns a copy of VECTOR_OR_NUMBER with all components rounded. */
 readonly round<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector
 /** Returns a copy of VECTOR_OR_NUMBER with all components rounded up. */
 readonly ceil<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector
 /** Returns a copy of VECTOR_OR_NUMBER with all components set to their absolute value. @remarks Not to be confused with `Vector.magnitude` which always returns a number. */
 readonly abs<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector

 /** Performs the given binary operation on vectors a and b. They must have the same dimension. Returns a vector of the same dimension. */
 readonly operate<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector, VECTOR_NUMBER_OR_OPERATION: TVector, VECTOR_OPERATION: IVectorOperation): TVector
 /** Performs the given binary operation on vector a and number b. Returns a vector of the same dimension as vector a. */
 readonly operate<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector, VECTOR_NUMBER_OR_OPERATION: number, VECTOR_OPERATION: IVectorOperation): TVector
 /** Performs the given binary operation on number a and vector b. Returns a vector of the same dimension as vector b. */
 readonly operate<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: number, VECTOR_NUMBER_OR_OPERATION: TVector, VECTOR_OPERATION: IVectorOperation): TVector
 /** Performs the given unary operation on each component of the given vector. Returns a vector of the same dimension. */
 readonly operate<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector, VECTOR_NUMBER_OR_OPERATION: IVectorOperation): TVector
 /** Performs the given binary operation on numbers a and b. Returns a number. */
 readonly operate(VECTOR_OR_NUMBER: number, VECTOR_NUMBER_OR_OPERATION: number, VECTOR_OPERATION: IVectorOperation): number
 /** Performs the given unary operation on the given number. Returns a number. */
 readonly operate(VECTOR_OR_NUMBER: number, VECTOR_NUMBER_OR_OPERATION: IVectorOperation): number

 /** Adds vectors a and b. They must have the same dimension. Returns a vector of the same dimension. */
 readonly add<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Adds vector a to number b. Returns a vector of the same dimension as vector a. */
 readonly add<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: number): TVector
 /** Adds number a to vector b. Returns a vector of the same dimension as vector b. */
 readonly add<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Adds numbers a and b. Returns a number. */
 readonly add(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): number

 /** Subtracts vector b from vector a. They must have the same dimension. Returns a vector of the same dimension. */
 readonly subtract<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Subtracts number b from vector a. Returns a vector of the same dimension as vector a. */
 readonly subtract<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: number): TVector
 /** Subtracts vector b from number a. Returns a vector of the same dimension as vector b. */
 readonly subtract<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Subtracts number b from number a. Returns a number. */
 readonly subtract(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): number

 /** Multiplies vectors a and b. They must have the same dimension. Returns a vector of the same dimension. */
 readonly multiply<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Multiplies vector a by number b. Returns a vector of the same dimension as vector a. */
 readonly multiply<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: number): TVector
 /** Multiplies number a by vector b. Returns a vector of the same dimension as vector b. */
 readonly multiply<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Multiplies numbers a and b. Returns a number. */
 readonly multiply(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): number

 /** Divides vectors a and b. They must have the same dimension. Returns a vector of the same dimension. */
 readonly divide<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Divides vector a by number b. Returns a vector of the same dimension as vector a. */
 readonly divide<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: TVector, VECTOR_OR_NUMBER_B: number): TVector
 /** Divides number a by vector b. Returns a vector of the same dimension as vector b. */
 readonly divide<TVector extends Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: TVector): TVector
 /** Divides numbers a and b. Returns a number. */
 readonly divide(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): number

 /** Returns a number representing the dot product of the two vectors. */
 readonly dot(VECTOR_OR_NUMBER_A: Vector4, VECTOR_OR_NUMBER_B: Vector4): number
 readonly dot(VECTOR_OR_NUMBER_A: Vector3, VECTOR_OR_NUMBER_B: Vector3): number
 readonly dot(VECTOR_OR_NUMBER_A: Vector2, VECTOR_OR_NUMBER_B: Vector2): number
 /** Returns a number representing the product of the two numbers. */
 readonly dot(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): number

 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` for each `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 4D hyperrectangle of size `VECTOR_OR_NUMBER`. */
 readonly forEachPointInHyperrectangle(VECTOR_OR_NUMBER: Vector4, VECTOR_LOOP_CALLBACK: (vectorOrNumber: Vector4, index: number) => void): void
 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` for each `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 3D rectangular prism of size `VECTOR_OR_NUMBER`. */
 readonly forEachPointInHyperrectangle(VECTOR_OR_NUMBER: Vector3, VECTOR_LOOP_CALLBACK: (vectorOrNumber: Vector3, index: number) => void): void
 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` for each `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 2D rectangle of size `VECTOR_OR_NUMBER`. */
 readonly forEachPointInHyperrectangle(VECTOR_OR_NUMBER: Vector2, VECTOR_LOOP_CALLBACK: (vectorOrNumber: Vector2, index: number) => void): void
 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` for each `vectorOrNumber` in the unit lattice of points contained (inclusively) within the line of length `VECTOR_OR_NUMBER`. */
 readonly forEachPointInHyperrectangle(VECTOR_OR_NUMBER: number, VECTOR_LOOP_CALLBACK: (vectorOrNumber: number, index: number) => void): void

 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` over every `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 4D hyperellipsoid with radius `VECTOR_OR_NUMBER`, with `vectorOrNumber` being relative to the center of the hyperellipsoid. */
 readonly forEachPointInHyperellipsoid(VECTOR_OR_NUMBER: Vector4, VECTOR_LOOP_CALLBACK: (vectorOrNumber: Vector4, index: number) => void): void
 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` over every `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 3D ellipsoid with radius `VECTOR_OR_NUMBER`, with `vectorOrNumber` being relative to the center of the ellipsoid. */
 readonly forEachPointInHyperellipsoid(VECTOR_OR_NUMBER: Vector3, VECTOR_LOOP_CALLBACK: (vectorOrNumber: Vector3, index: number) => void): void
 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` over every `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 2D ellipse with radius `VECTOR_OR_NUMBER`, with `vectorOrNumber` being relative to the center of the ellipse. */
 readonly forEachPointInHyperellipsoid(VECTOR_OR_NUMBER: Vector2, VECTOR_LOOP_CALLBACK: (vectorOrNumber: Vector2, index: number) => void): void
 /** Calls `VECTOR_LOOP_CALLBACK(vectorOrNumber)` over every `vectorOrNumber` in the unit lattice of points contained (inclusively) within the 1D interval with half-length `VECTOR_OR_NUMBER`, with `vectorOrNumber` being relative to the center of the interval. */
 readonly forEachPointInHyperellipsoid(VECTOR_OR_NUMBER: number, VECTOR_LOOP_CALLBACK: (vectorOrNumber: number, index: number) => void): void

 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 4D hyperellipsoid of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector4, VECTOR_OR_NUMBER_B: Vector4): boolean
 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 3D ellipsoid of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector3, VECTOR_OR_NUMBER_B: Vector3): boolean
 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 2D ellipse of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector2, VECTOR_OR_NUMBER_B: Vector2): boolean
 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 4D 3-sphere (hypersphere) of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector4, VECTOR_OR_NUMBER_B: number): boolean
 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 3D 2-sphere (sphere) of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector3, VECTOR_OR_NUMBER_B: number): boolean
 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 2D 1-sphere (circle) of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector2, VECTOR_OR_NUMBER_B: number): boolean
 /** Tests `VECTOR_OR_NUMBER_A` to see if it is contained within the 1D 0-sphere (interval) of radius `VECTOR_OR_NUMBER_B`. */
 readonly isInHyperellipsoid(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): boolean

 /** Returns a Vector3 representing three angles ({ x: w-axis hyperangle, y: z-axis hyperangle, z: xy-plane azimuth }, in radians) aiming at `VECTOR_OR_NUMBER_A` within the 4D hyperellipsoid of radius `VECTOR_OR_NUMBER_B`. */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector4, VECTOR_OR_NUMBER_B: Vector4): boolean
 /** Returns a Vector2 representing two angles ({ x: z-axis inclination, y: xy-plane azimuth }, in radians) aiming at `VECTOR_OR_NUMBER_A` within the 3D ellipsoid of radius `VECTOR_OR_NUMBER_B`. */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector3, VECTOR_OR_NUMBER_B: Vector3): boolean
 /** Returns a number representing the angle (xy-plane azimuth, in radians) aiming at `VECTOR_OR_NUMBER_A` within the 2D ellipse of radius `VECTOR_OR_NUMBER_B`. */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector2, VECTOR_OR_NUMBER_B: Vector2): boolean
 /** Returns a Vector3 representing three angles ({ x: w-axis hyperangle, y: z-axis hyperangle, z: xy-plane azimuth }, in radians) aiming at `VECTOR_OR_NUMBER_A` within the 4D hypersphere of radius `VECTOR_OR_NUMBER_B`. */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector4, VECTOR_OR_NUMBER_B: number): boolean
 /** Returns a Vector2 representing two angles ({ x: z-axis inclination, y: xy-plane azimuth }, in radians) aiming at `VECTOR_OR_NUMBER_A` within the 3D sphere of radius `VECTOR_OR_NUMBER_B`. */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector3, VECTOR_OR_NUMBER_B: number): boolean
 /** Returns a number representing the angle (xy-plane azimuth, in radians) aiming at `VECTOR_OR_NUMBER_A` within the 2D circle of radius `VECTOR_OR_NUMBER_B`. */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: Vector2, VECTOR_OR_NUMBER_B: number): boolean
 /** Returns a number representing the angle in radians aiming at `VECTOR_OR_NUMBER_A` within the line interval of half-length `VECTOR_OR_NUMBER_B` (either exactly 0 or exactly Math.PI). */
 readonly angleInHyperellipsoid(VECTOR_OR_NUMBER_A: number, VECTOR_OR_NUMBER_B: number): 0 | 3.141592653589793

 /** Creates a copy of the given vector. */
 readonly copy<TVector extends number | Vector2 | Vector3 | Vector4>(VECTOR_OR_NUMBER: TVector): TVector
}

declare class Vector2 {

 x: number
 y: number
 xy: Vector2

 r: number
 g: number
 rg: Vector2

 u: number
 v: number
 uv: Vector2

 readonly data: number[]
}

declare class Vector3
 extends Vector2 {

 z: number
 xyz: Vector3

 b: number
 rgb: Vector3

 p: number
 uvp: Vector3
}

declare class Vector4
 extends Vector3 {

 w: number
 xyzw: Vector4

 a: number
 rgba: Vector4

 q: number
 uvpq: Vector4
}

declare type IVectorOperation = (a: number, b?: number) => number

/** A utility part for creating and manipulating arbitrary-length vectors. Any object with entirely numeric values can be treated as a vector. */
declare const Vector: IVector
type Vector = T

declare const VECTOR_OPERATION: IVectorOperation
declare const VECTOR_LOOP_CALLBACK: (VECTOR_OR_NUMBER: number | Vector2 | Vector3 | Vector4) => void
declare const VECTOR_OR_NUMBER: number | Vector2 | Vector3 | Vector4
declare const VECTOR_OR_NUMBER_A: number | Vector2 | Vector3 | Vector4
declare const VECTOR_OR_NUMBER_B: number | Vector2 | Vector3 | Vector4
declare const VECTOR_NUMBER_OR_OPERATION: number | Vector2 | Vector3 | Vector4 | IVectorOperation