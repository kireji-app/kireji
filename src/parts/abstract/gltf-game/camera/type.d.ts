declare interface IGLTFGameCamera
 extends IMix<IGLTFGame<IPartAny>, IAngle<IGLTFGameCamera>> {

 // Subparts.
 readonly x: IAngle<IGLTFGameCamera>
 readonly y: IAngle<IGLTFGameCamera>
 readonly z: IAngle<IGLTFGameCamera>

 // Components.
 readonly buffer: Float32Array
 readonly model: Vector3
 readonly manifest: IGLTFGameCameraManifest
}

declare interface IAngle<TOwner>
 extends IPart<TOwner, null> {

 // Properties.
 readonly smooth: number
}

declare interface IGLTFGameCameraManifest
 extends IPartManifest {
 readonly fov: number
 readonly near: number
 readonly far: number
 readonly scope: number
 readonly pixelRatio: number
 /** The height of the camera lens from the ground. */
 readonly height: number
}

declare const thisGLTFGameCamera: IGLTFGameCamera
type GLTFGameCamera = T