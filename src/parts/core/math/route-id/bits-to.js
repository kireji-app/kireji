const lastIndex = BigInt(CARDINALITY) - 1n
return (lastIndex ? lastIndex.toString(2).length : 0) + (SHOW_UNIT ? " bit" + (lastIndex !== 1 ? "s" : "") : 0)