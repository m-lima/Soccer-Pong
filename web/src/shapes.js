export class Area {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.r = x + w
    this.b = y + h
  }
}

export class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r

    this.n = y - r
    this.e = x + r
    this.s = y + r
    this.w = x - r
  }

  intersects(other) {
    if (other instanceof Area) {
      return !(this.e < other.x || this.w > other.r || this.s < other.y || this.n > other.b)
    }
  }
}

