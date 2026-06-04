const { model } = _

if (!("app" in model))
 model.app = {}

if (!("kireji" in model.app))
 model.app.kireji = {}

if (!("issue-tracker" in model.app.kireji))
 model.app.kireji["issue-tracker"] = {}

if (PATHNAME === "/") {

 if (HASH !== "#top")
  model.app.kireji["issue-tracker"].sections = "summary"

} else {

 const parts = PATHNAME.split("/").slice(1)

 if (parts[0] !== "issues" || !parts[1] || parts.length !== 2 || isNaN(parts[1]) || !(parts[1] in KirejiIssueTracker.sections.issues))
  throw error("Unknown Canonical Path: " + PATHNAME)

 model.app.kireji["issue-tracker"].sections = {
  issues: parts[1]
 }
}

return RID.toPath(_.modelToRID(model))