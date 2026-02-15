const terminalKeys = new Set()

let contextkeyispressed, shiftkeyispressed, altkeyispressed

for (const code of hotKeys.pressed)
 if (code.startsWith(hotKeys.contextPrefix))
  contextkeyispressed = true
 else if (code.startsWith("Shift"))
  shiftkeyispressed = true
 else if (code.startsWith("Alt"))
  altkeyispressed = true
 else if (code.startsWith("Key"))
  terminalKeys.add(code.slice(3).toLowerCase())
 else if (code.startsWith("Digit"))
  terminalKeys.add(code.slice(5).toLowerCase())
 else if (/^(Minus|Equal|Semicolon|Quote|Comma|Period|Slash|Backquote|Backslash|Bracket(Right|Left)|Arrow(Up|Down|Left|Right)|Escape|Tab|Enter|Backspace)$/.test(code))
  terminalKeys.add(code.toLowerCase())
 else if (!production && code === "F8")
  debugger
 else debug("Unhandled Key Code: " + code)

const combo = [...terminalKeys].sort()

if (shiftkeyispressed) combo.unshift("shift")
if (altkeyispressed) combo.unshift("alt")
if (contextkeyispressed) combo.unshift("context")

return combo.join("+")