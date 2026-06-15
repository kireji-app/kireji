declare interface IGLTFGame<TOwner>
 extends IApp<TOwner, IPartAny> {

 // Subparts.
 readonly camera: IGLTFGameCamera
 readonly levels: IGLTFGameLevels

 // Components.
 readonly position: Vector3
 /** A universal shader template for rendering unlit materials. */
 readonly "unlit.wgsl": string
 /** The HTML representing the in-game heads up display. */
 readonly "hud.html": string
 /** The HTML representing the game's pause menu. */
 readonly "pause-menu.html": string
 /** Uses the GPU to render an image of the current game frame to the offscreen canvas. */
 readonly render(): void
 readonly updateCanvasSize(): void
 readonly async loadLevelAsync(): Promise<void>
 readonly updateUniformBuffer(): void
 readonly reactToKeyboardInput(): void
 /** Unpauses the game, requests pointer lock and fullscreen. @remarks **MUST** be called in response to a user gesture (like a click) to work properly. */
 readonly async playAsync(): Promise<void>
 /** Pauses the game, cancelling any pointer lock and full screen that may exist. */
 readonly async pauseAsync(): Promise<void>
 /** Calls `playAsync()`. */
 readonly playPoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, ...ARGS: any[]): void
 /** Resets the game back to the landing model and calls `playAsync()`.  */
 readonly restartPoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, ...ARGS: any[]): void
 /** Shows the settings UI.  */
 readonly settingsPoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, ...ARGS: any[]): void
 /** Plays the game's credits sequence.  */
 readonly creditsPoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, ...ARGS: any[]): void
 /** Engages the player click action.  */
 readonly actionPoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, ...ARGS: any[]): void
 readonly manifest: IGLTFGameManifest

 // Properties.
 readonly loading: boolean
 readonly loadedLevel?: IGLTFGameLevel
 /** The player's walking speed in inches per second. */
 readonly walkingSpeed: number
 readonly loadedLevel?: IGLTFGameLevel
 /** The player's sprinting speed in inches per second. */
 readonly sprintingSpeed: number
 readonly uniformBuffer?: GPUBuffer
 readonly mouseSensitivity: number
 readonly onscreenContext?: CanvasRenderingContext2D
 readonly offscreenContext?: GPUCanvasContext
 readonly currentTurnSpeed: number
 readonly canvasSizeChanged: boolean
 readonly renderPassDefinitions: GPURenderPassDefinition[]
}

declare interface IGLTFGameManifest
 extends IPartManifest {

 /** Whether or not to show the debug overlay which includes a map of the walkable and the player's current coordinates. */
 readonly debug: boolean
 readonly walkingSpeed: number
 readonly sprintingSpeed: number
 /** The turn speed when using the mouse. */
 readonly mouseSensitivity: number
 /** The turn speed when using the arrow keys. */
 readonly keyboardSensitivity: number
}

declare interface GPURenderPassDefinition {
 readonly indexCount: number
 readonly vertexBuffers: [
  slot: GPUIndex32,
  buffer:
  | GPUBuffer
  | null
  | undefined,
  offset?: GPUSize64,
  size?: GPUSize64
 ]
 readonly indexBuffer: GPUBuffer
 readonly bindGroup: GPUBindGroup
 readonly pipeline: GPURenderPipeline
}

declare const thisGLTFGame: IGLTFGame<IPartAny>