const boilerplate = ƒ.toString()
const sourceFile = new SourceMappedFile("../", undefined, "build.js")
sourceFile.addSection(boilerplate, sourceFile.addSource("build.js", boilerplate))
sourceFile.addSection(`\nƒ(${serialize(_)}, ${serialize(compressedSubjectOrigins)})`, sourceFile.addSource(property.filename, property.content))
const script = sourceFile.packAndMap()
return script