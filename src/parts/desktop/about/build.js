define(AboutApp, {
 swByteCount: {
  value: new TextEncoder().encode(_["build.js"]).length
 },
 swPercent: {
  resolve() {
   return Math.round((this.swByteCount / 10 ** 6) / 5 * 100)
  }
 },
 longestHost: {
  value: _.publicHosts.split(" ").reduce((a, b) => a.length >= b.length ? a : b)
 }
})