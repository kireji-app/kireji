const sourceFile = new SourceMappedFile()

// Copy the entire build function.
sourceFile.copyFrom({})

// Copy the build function call and serialized archive.
sourceFile.copyFrom({
 part: thisPart,
 filename: components[componentKey].filename,
 literal: `@json@\nƒ(${serialize(_)})`
})

return sourceFile.packAndMap()