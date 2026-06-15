if (typeof START_RANGE !== typeof END_RANGE || typeof END_RANGE !== typeof VALUE_TO_CLAMP)
 throw error(`can't mix types (found ${typeof START_RANGE} START_RANGE, ${typeof END_RANGE} END_RANGE and ${typeof VALUE_TO_CLAMP} VALUE_TO_CLAMP)`)

const min = START_RANGE < END_RANGE ? START_RANGE : END_RANGE
const max = START_RANGE > END_RANGE ? START_RANGE : END_RANGE

if (VALUE_TO_CLAMP > max)
 return max

if (VALUE_TO_CLAMP < min)
 return min

return VALUE_TO_CLAMP