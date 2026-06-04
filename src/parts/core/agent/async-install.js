define(Agent, {
 isMac: { value: navigator.userAgent.indexOf("Mac") > -1 },
 isSafari: { value: /^((?!chrome|android).)*safari/i.test(navigator.userAgent) }
})