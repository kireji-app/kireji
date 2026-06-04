const hasNoTabs = !KirejiTabGroup.openTabs.length
const previewTab = KirejiTabGroup.previewTab

if (KirejiTabGroup.openTabs.length !== KirejiTabGroup.viewedOpenTabs.length || KirejiTabGroup.viewedPermutationRID !== KirejiTabGroup.permutationRID || KirejiTabGroup.viewedPayloadRID !== KirejiTabGroup.payloadRID) {
 const tabContainer = Q("#tab-group")
 const existingTabCount = KirejiTabGroup.viewedOpenTabs.length
 const targetTabCount = KirejiTabGroup.openTabs.length
 const maxLength = Math.max(existingTabCount, targetTabCount)

 for (let i = 0; i < maxLength; i++) {
  if (targetTabCount <= i) {
   tabContainer.children[i].remove()
   continue
  }

  const newOpenTab = KirejiTabGroup.openTabs[i]
  const existingOpenTab = KirejiTabGroup.viewedOpenTabs[i]

  if (existingOpenTab === newOpenTab)
   continue

  const newTabElement = (() => {
   const offscreen = document.createElement("div")
   offscreen.innerHTML = KirejiTabGroup.renderTabHTML(newOpenTab.part, newOpenTab.filename, newOpenTab.payload, i)
   return offscreen.querySelector("tab-")
  })()

  if (existingOpenTab) {
   tabContainer.children[i].replaceWith(newTabElement)
   continue
  }

  tabContainer.appendChild(newTabElement)
 }
 KirejiTabGroup.viewedPermutationRID = KirejiTabGroup.permutationRID
 KirejiTabGroup.viewedPayloadRID = KirejiTabGroup.payloadRID
 KirejiTabGroup.viewedOpenTabs = [...KirejiTabGroup.openTabs]
}

if (KirejiTabGroup.viewedActiveTab && KirejiTabGroup.viewedActiveTab !== KirejiTabGroup.activeTab)
 Q(`tab-[data-active]`)?.removeAttribute("data-active")

if (KirejiTabGroup.viewedPreviewTab && KirejiTabGroup.viewedPreviewTab !== previewTab)
 Q(`tab-[data-preview]`)?.removeAttribute("data-preview")

const currentTabLayout = KirejiTabGroup.viewedActiveTab ? (KirejiTabGroup.viewedActiveTab.filename ? "file" : "summary") : "empty"

KirejiTabGroup.viewedActiveTab = KirejiTabGroup.activeTab
KirejiTabGroup.viewedPreviewTab = previewTab

if (!hasNoTabs) {
 const activeTabElement = Q(`tab-:nth-child(${KirejiTabGroup.activeTabIndex + 1})`)

 if (!activeTabElement.hasAttribute("data-active")) {
  activeTabElement.setAttribute("data-active", "")
  activeTabElement.scrollIntoView({
   behavior: "smooth",
   inline: 'nearest',
  })
 }

 KirejiTabGroup.attachListeners()

 const previewTabElement = KirejiTabGroup.previewTabIndex === null ? null : Q(`tab-:nth-child(${KirejiTabGroup.previewTabIndex + 1})`)

 if (previewTabElement && !previewTabElement.hasAttribute("data-preview"))
  previewTabElement.setAttribute("data-preview", "")
}

if (currentTabLayout === "summary") {
 if (hasNoTabs) {
  Q(`editor-view scroll-content`).innerHTML = KirejiEditor["empty-view.html"]
 } else if (!KirejiTabGroup.viewedActiveTab.filename) {
  for (const section of KirejiEditorSections) {
   const element = Q(`#info-${section.key}>section`)
   element.innerHTML = section["part.html"]
   if (section.key.startsWith("state")) {
    if (KirejiTabGroup.activePart.isAbstract || section.key === "state" && KirejiTabGroup.activePart.disabled)
     element.setAttribute("disabled", "")
    else
     element.removeAttribute("disabled")
   }
  }
 } else {
  Q(`editor-view scroll-content`).innerHTML = KirejiEditor["file-view.html"]
 }
 Q(`crumbs-`).innerHTML = KirejiEditor["crumbs.html"]
} else if (currentTabLayout === "file") {
 if (hasNoTabs) {
  Q(`editor-view scroll-content`).innerHTML = KirejiEditor["empty-view.html"]
 } else if (KirejiTabGroup.viewedActiveTab.filename) {
  Q('editor-view scroll-content').innerHTML = KirejiEditor["file-view.html"]
 } else {
  Q(`editor-view scroll-content`).innerHTML = KirejiEditor["summary-view.html"]
 }
 Q(`crumbs-`).innerHTML = KirejiEditor["crumbs.html"]
} else {
 if (hasNoTabs)
  throw error(`Unexpected update to empty tab group without adding any new tabs`)
 if (KirejiTabGroup.viewedActiveTab.filename) {
  Q(`editor-view scroll-content`).innerHTML = KirejiEditor["file-view.html"]
 } else {
  Q(`editor-view scroll-content`).innerHTML = KirejiEditor["summary-view.html"]
 }
 Q(`crumbs-`).innerHTML = KirejiEditor["crumbs.html"]
}

Q("#sidebar-view summary[data-active]")?.removeAttribute("data-active")

if (!hasNoTabs)
 Q(`#sidebar-view summary[data-index="${allParts.indexOf(KirejiTabGroup.viewedActiveTab.part)}"]`)?.setAttribute("data-active", "")