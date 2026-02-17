// TODO: consider moving this check (and the cardinality type check) to a post-build "validation" step?
if (!scroller.query)
 throw new ReferenceError(`Scrollers must define a css selector at \`scroller.query\` which can select the parent element of the scroller (from ${scroller.host}).`)

scroller.define({
 cardinality: { value: 10_000n },
 content: { value: null, writable: true },
 listener: { value: scrollEvent => scroller.onscroll(scrollEvent) },
 container: { value: null, writable: true },
 observer: { value: null, writable: true },
 scrollBar: { value: null, writable: true },
 thumb: { value: null, writable: true },
 skipDOMUpdate: { value: false, writable: true },
 skipRouteIDUpdate: { value: false, writable: true }
})