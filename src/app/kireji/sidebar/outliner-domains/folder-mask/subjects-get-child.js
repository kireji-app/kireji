/** @type {IPartAny} */
const subjectPart = BITMASK_NODE.subject
return subjectPart.subdomains.map(subdomain => subjectPart[subdomain])