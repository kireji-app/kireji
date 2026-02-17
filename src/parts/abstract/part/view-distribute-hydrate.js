// Hydrate own view before hydrating subpart views.
if (part.enabled) {

 if (part.isOpen)
  part.hydrateView()

 // Don't distribute hydration to disabled subparts. They will call `addView()` when they enable.
 for (const subpart of part)
  subpart.distributeHydrateView()
}