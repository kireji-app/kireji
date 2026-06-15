define(AboutApp, {
 worstCaseURL: {
  value: `https://${AboutApp.longestHost}/${_.version}/${RID.toHash(_.cardinality - 1n)}/`
 },
 urlUsedPercent: {
  resolve() { return Math.round(this.worstCaseURL.length / this.maxURLLength * 100) }
 }
})