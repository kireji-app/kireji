const worstCaseURL = `https://${AboutApp.longestHost}/${_.version}/${RID.toHash(_.cardinality - 1n)}/`
return Math.round(worstCaseURL.length / 2000 * 100)