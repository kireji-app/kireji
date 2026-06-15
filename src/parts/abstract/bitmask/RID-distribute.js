thisBitmask.updateRID(NEW_RID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

thisBitmask.selectedNodes.clear()

for (const node of thisBitmask.maskedNodeList)
 if (((1n << BigInt(node.maskIndex)) & thisBitmask.rid) > 0n)
  thisBitmask.selectedNodes.add(node)