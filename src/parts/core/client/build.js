client.define({
 hydrated: { value: false, writable: true },
 fps: { value: 60, writable: true },
 now: { value: null, writable: true },
 deltaTime: { value: null, writable: true },
 meanFrameTime: { value: 1000 / 60, writable: true },
})