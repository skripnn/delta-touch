class DeltaTouchClass {
  x = true
  y = true
  touchDeltas = []
  moveTimer
  endTimer
  lastDelta
  lastTouch

  constructor(dim) {
    if (dim === 'x') this.y = false
    if (dim === 'y') this.x = false
  }

  eXY(e) {
    return (this.x? e.touches[0].clientX : 0) + (this.y? e.touches[0].clientY : 0)
  }

  start(e) {
    clearInterval(this.endTimer)
    if (e.touches.length > 1) {
      this.lastTouch = null
      this.lastDelta = null
      return
    }
    e.preventDefault()
    this.lastTouch = this.eXY(e)
  }

  move(e, func) {
    if (e.touches.length > 1 || !this.lastTouch) return
    let delta = this.lastTouch - this.eXY(e)
    this.lastTouch = this.eXY(e)
    this.touchDeltas.push(delta)
    this.lastDelta = delta
    this.moveTimer = setInterval(() => {
      if (this.touchDeltas.length === 0) {
        clearInterval(this.moveTimer)
        return
      }
      else delta = this.touchDeltas.splice(0, 1)[0]
      if (delta > 50) {
        delta = delta / 2
        func(delta)
      }
      func(delta)
    }, 16)
    e.preventDefault()
  }

  end(e, func) {
    if (this.lastDelta) {
      let a = this.lastDelta > 0 ? this.lastDelta : -this.lastDelta
      let deltaList = []
      while (a > 0.1) {
        a -= Math.log1p(a) * 0.5
        const delta = Math.ceil(this.lastDelta > 0 ? a : -a)
        deltaList.push(delta)
        if (a < 10) deltaList.push(delta)
        if (a < 5) deltaList.push(delta)
        if (a < 2) deltaList.push(delta)
      }
      this.endTimer = setInterval(() => {
        const delta = deltaList.splice(0, 1)[0]
        func(delta)
        if (deltaList.length === 0) clearInterval(this.endTimer)
      }, 16)
      this.lastDelta = null
    }
  }
}

export const DeltaTouch = new DeltaTouchClass()
export const DeltaTouchX = new DeltaTouchClass('x')
export const DeltaTouchY = new DeltaTouchClass('y')

export default DeltaTouch