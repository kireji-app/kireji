class Vector2 {

 data = []

 constructor(x = 0, y = 0) {
  this.data.push(x, y)
 }

 get x() {
  return this.data[0]
 }
 set x(value) {
  this.data[0] = value
 }

 get y() {
  return this.data[1]
 }
 set y(value) {
  this.data[1] = value
 }

 get xy() {
  return Vector.xy(this.x, this.y)
 }
 set xy(value) {

  if (!(value instanceof Vector.xy))
   throw error(`set xy failed; the input value was not the right type`)

  this.x = value.x
  this.y = value.y
 }

 get r() {
  return this.data[0]
 }
 set r(value) {
  this.data[0] = value
 }

 get g() {
  return this.data[1]
 }
 set g(value) {
  this.data[1] = value
 }

 get rg() {
  return Vector.rg(this.r, this.g)
 }
 set rg(value) {

  if (!(value instanceof Vector.rg))
   throw error(`set rg failed; the input value was not the right type`)

  this.r = value.r
  this.g = value.g
 }

 get u() {
  return this.data[0]
 }
 set u(value) {
  this.data[0] = value
 }

 get v() {
  return this.data[1]
 }
 set v(value) {
  this.data[1] = value
 }

 get uv() {
  return Vector.uv(this.u, this.v)
 }
 set uv(value) {

  if (!(value instanceof Vector.uv))
   throw error(`set uv failed; the input value was not the right type`)

  this.u = value.u
  this.v = value.v
 }
}

class Vector3 extends Vector2 {
 constructor(x = 0, y = 0, z = 0) {
  super(x, y)
  this.data.push(z)
 }

 get z() {
  return this.data[2]
 }
 set z(value) {
  this.data[2] = value
 }

 get xyz() {
  return Vector.xyz(this.x, this.y, this.z)
 }
 set xyz(value) {

  if (!(value instanceof Vector.xyz))
   throw error(`set xyz failed; the input value was not the right type`)

  this.x = value.x
  this.y = value.y
  this.z = value.z
 }

 get b() {
  return this.data[2]
 }
 set b(value) {
  this.data[2] = value
 }

 get rgb() {
  return Vector.rgb(this.r, this.g, this.b)
 }
 set rgb(value) {

  if (!(value instanceof Vector.rgb))
   throw error(`set rgb failed; the input value was not the right type`)

  this.r = value.r
  this.g = value.g
  this.b = value.b
 }

 get p() {
  return this.data[2]
 }
 set p(value) {
  this.data[2] = value
 }

 get uvp() {
  return Vector.uvp(this.u, this.v, this.p)
 }
 set uvp(value) {

  if (!(value instanceof Vector.uvp))
   throw error(`set uvp failed; the input value was not the right type`)

  this.u = value.u
  this.v = value.v
  this.p = value.p
 }
}

class Vector4 extends Vector3 {
 constructor(x = 0, y = 0, z = 0, w = 0) {
  super(x, y, z)
  this.data.push(w)
 }

 get w() {
  return this.data[3]
 }
 set w(value) {
  this.data[3] = value
 }

 get xyzw() {
  return Vector.xyzw(this.x, this.y, this.z, this.w)
 }
 set xyzw(value) {

  if (!(value instanceof Vector.xyzw))
   throw error(`set xyzw failed; the input value was not the right type`)

  this.x = value.x
  this.y = value.y
  this.z = value.z
  this.w = value.w
 }

 get a() {
  return this.data[3]
 }
 set a(value) {
  this.data[3] = value
 }

 get rgba() {
  return Vector.rgba(this.r, this.g, this.b, this.a)
 }
 set rgba(value) {

  if (!(value instanceof Vector.rgba))
   throw error(`set rgba failed; the input value was not the right type`)

  this.r = value.r
  this.g = value.g
  this.b = value.b
  this.a = value.a
 }

 get q() {
  return this.data[3]
 }
 set q(value) {
  this.data[3] = value
 }

 get uvpq() {
  return Vector.uvpq(this.u, this.v, this.p, this.q)
 }
 set uvpq(value) {

  if (!(value instanceof Vector.uvpq))
   throw error(`set uvpq failed; the input value was not the right type`)

  this.u = value.u
  this.v = value.v
  this.p = value.p
  this.q = value.q
 }
}

define(Vector, {
 2: { value(...args) { return new Vector2(...args) } },
 xy: { resolve() { return this[2] } },
 rg: { resolve() { return this[2] } },
 uv: { resolve() { return this[2] } },

 3: { value(...args) { return new Vector3(...args) } },
 xyz: { resolve() { return this[3] } },
 rgb: { resolve() { return this[3] } },
 uvp: { resolve() { return this[3] } },

 4: { value(...args) { return new Vector4(...args) } },
 xyzw: { resolve() { return this[4] } },
 rgba: { resolve() { return this[4] } },
 uvpq: { resolve() { return this[4] } }
})