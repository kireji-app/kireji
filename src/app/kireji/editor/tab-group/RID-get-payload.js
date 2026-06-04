const numberOfTabsOpen = BigInt(TABS.length)

let payloadRID = 0n

for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++)
 payloadRID += BigInt(TABS[Number(currentTabIndex)].payload ?? 0) * KirejiTabGroup.payloadSizes[currentTabIndex]

return payloadRID