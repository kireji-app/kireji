/** @type {IPartAny[]} */
const ownChildParts = base()

return ownChildParts.sort((a, b) => b.inheritors.length - a.inheritors.length)