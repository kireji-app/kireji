const tabFile = TAB_SUBJECT.kind === "part" ? null : TAB_SUBJECT
const tabPart = tabFile?.owner ?? TAB_SUBJECT
const tabLabel = tabFile?.key ?? tabPart.key
const tabPartPath = tabPart === _ ? "" : tabPart[".."] === _ ? (tabFile ? tabPart.key : "") : (tabFile ? `.../${tabPart.key}` : `.${tabPart[".."].key}${tabPart[".."][".."] === _ ? '' : '...'}`)

return `<tab-${KirejiTabGroup.activeTabIndex === TAB_INDEX ? " data-active" : ""}${KirejiTabGroup.previewTabIndex === TAB_INDEX ? " data-preview" : ""}${` data-payload=${TAB_PAYLOAD}`}><button ${KirejiEditor.pointAttr()} tabIndex=0 class=tab-button><img src="${tabPart.placeholderImage("part.png")}"/>${tabLabel}${(tabPart === _ || tabPart[".."] === _) ? '' : `<span class=tab-path>${tabPartPath}</span>`}</button><button ${KirejiEditor.pointAttr("closePoint")} class=close-tab>✕</button></tab->`