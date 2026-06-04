base()

const oneMinute = 60000

/** Added to ensure any performance.now() precision does not cause the clock to lag one minute behind. */
const securityDelay = 3

setTimeout(() => {
 Clock.element.textContent = Clock.time;
 setInterval(() => Clock.element.textContent = Clock.time, oneMinute)
}, oneMinute - new Date().getSeconds() * 1000 + securityDelay)