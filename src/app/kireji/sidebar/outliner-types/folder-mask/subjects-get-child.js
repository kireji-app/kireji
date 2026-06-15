/** @type {IPartAny} */
const subjectPart = BITMASK_NODE.subject

// Here lies the problem. The SOLE reason why we need to collect build the entire system, then collect and sort inheritors, then build each part.
// It is the build process that populates the inheritors array of each part.

return subjectPart.inheritors