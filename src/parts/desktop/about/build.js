define(AboutApp, {
 offlineServerMaxBytes: {
  value: 5_000_000
 },
 offlineServerByteCount: {
  value: new TextEncoder().encode(_["build.js"]).length
 },
 offlineServerUsedPercent: {
  resolve() {
   return Math.round(100 * this.offlineServerByteCount / this.offlineServerMaxBytes)
  }
 },
 longestHost: {
  value: _.publicHosts.split(" ").reduce((a, b) => a.length >= b.length ? a : b)
 },
 offscreenContext: {
  value: null,
  writable: true
 },
 maxURLLength: {
  value: 2000
 },
 imageCache: {
  value: {}
 },
 appCount: {
  value: _.publicHosts.split(" ").length
 },
 newVersion: {
  value: null,
  writable: true
 }
})