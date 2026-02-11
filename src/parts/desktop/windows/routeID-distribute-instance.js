const instance = {
 application: windows.superset[SUBJECT_INDEX]
}

instance.top = Number(ROUTE_ID % 2000n)
ROUTE_ID /= 2000n

instance.left = Number(ROUTE_ID % 2000n)
ROUTE_ID /= 2000n

instance.width = Number(ROUTE_ID % 2000n)
ROUTE_ID /= 2000n

instance.height = Number(ROUTE_ID % 2000n)
ROUTE_ID /= 2000n

return instance