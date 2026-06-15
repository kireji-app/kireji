const instance = {
 part: Windows.superset[SUBJECT_INDEX]
}

instance.top = Number(NEW_RID % 2000n)
NEW_RID /= 2000n

instance.left = Number(NEW_RID % 2000n)
NEW_RID /= 2000n

instance.width = Number(NEW_RID % 2000n)
NEW_RID /= 2000n

instance.height = Number(NEW_RID % 2000n)
NEW_RID /= 2000n

return instance