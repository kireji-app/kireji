// Run own loop action before running subpart loop actions.
if (thisPart.isOpen)
 thisPart.loop?.(_.now)

for (const subpart of thisPart)
 subpart.distributeLoop()