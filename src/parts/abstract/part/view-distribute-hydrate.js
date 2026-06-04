// Hydrate own view before hydrating subpart views.
if (thisPart.enabled) {

 if (thisPart.isOpen)
  thisPart.hydrateView()

 // Don't distribute hydration to disabled subparts. They will call `addView()` when they enable.
 for (const subpart of thisPart)
  subpart.distributeHydrateView()
}