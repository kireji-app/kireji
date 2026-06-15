let s1 = 1
let s2 = 0

for (const byte of BYTES) {
 s1 = (s1 + byte) % 65521
 s2 = (s2 + s1) % 65521
}

return ((s2 << 16) | s1) >>> 0