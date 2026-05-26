interface IAgent
 extends IFacet<ICore> {

 // Runtime Properties.
 readonly isMac: boolean
 readonly isSafari: boolean

 // Serialized Properties.
 /** Toggles the native fullscreen feature (if available) and returns the resulting state. If FORCE_STATE is provided, sets the fullscreen mode to the given state, instead of simply toggling it. */
 readonly toggleFullscreen(FORCE_STATE?: boolean = undefined)
}

declare const agent: IAgent