define(thisBitmask, {
 nodeList: {
  value: []
 },
 maskedNodeList: {
  value: []
 },
 selectedNodes: {
  value: new Set()
 },
 nodesBySubject: {
  value: new Map()
 },
 cardinality: {
  resolve() {

   if (!this.rootSubjects)
    throw error("missing `rootSubjects` component")

   if (!Array.isArray(this.rootSubjects))
    throw error("`rootSubjects` component must return an array")

   const isFlat = typeof this.getChildSubjects !== "function"
   const ignoreLeaves = this.manifest.ignoreLeaves

   if (isFlat && ignoreLeaves)
    warn(error(`ignoring leaves without "getChildSubjects" component; there will be no selectable elements`))

   /** @type {(subject: IPartAny, node: IBitmaskNode)} */
   const distributeNodeCreation = (subject, node) => {

    if (this.nodesBySubject.has(subject))
     throw error("duplicate subjects are not supported")

    node.subject = subject
    this.nodesBySubject.set(subject, node)
    const childSubjects = isFlat ? [] : this.getChildSubjects(node)
    node.isLeaf = childSubjects.length === 0
    node.index = this.nodeList.length
    this.nodeList.push(node)

    if (node.isLeaf && ignoreLeaves) {
     node.maskIndex = -1
     return
    }

    node.maskIndex = this.maskedNodeList.length
    this.maskedNodeList.push(node)

    for (const childSubject of childSubjects) {
     /** @type {IBitmaskNode} */
     const childNode = new Map()
     childNode.parentNode = node
     node.set(childSubject, childNode)
     distributeNodeCreation(childSubject, childNode)
    }
   }

   for (const rootSubject of this.rootSubjects) {
    /** @type {IBitmaskNode} */
    const rootNode = new Map()
    rootNode.parentNode = null
    distributeNodeCreation(rootSubject, rootNode)
   }

   return 2n ** BigInt(this.maskedNodeList.length)
  }
 }
})