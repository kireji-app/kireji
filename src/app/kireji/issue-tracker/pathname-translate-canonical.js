const { model } = _

debug('yes, it is translating ...')

if (!("app" in model))
 model.app = {}

if (!("kireji" in model.app))
 model.app.kireji = {}

if (!("issue-tracker" in model.app.kireji))
 model.app.kireji["issue-tracker"] = {}

// todo: add scroller
// model.app.kireji["issue-tracker"].scroller = 0

if (PATHNAME === "/") {

 if (HASH !== "#top")
  model.app.kireji["issue-tracker"].sections = "summary"

} else {

 const parts = PATHNAME.split("/").slice(1)

 debug({
  parts,
  badSubpath: parts[0] !== "issues",
  missingCode: !parts[1],
  wrongLength: parts.length !== 2,
  isNaN: isNaN(parts[1]),
  notFound: !(parts[1] in kirejiIssueTracker.sections.issues)
 })
 if (parts[0] !== "issues" || !parts[1] || parts.length !== 2 || isNaN(parts[1]) || !(parts[1] in kirejiIssueTracker.sections.issues))
  throw "Unknown Canonical Path: " + PATHNAME

 model.app.kireji["issue-tracker"].sections = {
  issues: parts[1]
 }
}

return encodePathname(_.modelToRouteID(model))