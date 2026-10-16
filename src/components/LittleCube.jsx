import { useEffect, useRef, useState } from 'react'

export default function LittleCube() {
  const poseRef = useRef(null)
  const angles = useRef({ x: -22, y: -30 })
  const drag = useRef({
    active: false,
    moved: false,
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  })
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (event) => setPaused(event.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  const turn = (x, y) => {
    angles.current.x += x
    angles.current.y += y
    poseRef.current.style.setProperty('--cube-x', `${angles.current.x}deg`)
    poseRef.current.style.setProperty('--cube-y', `${angles.current.y}deg`)
  }

  const release = (event) => {
    if (!drag.current.active) return
    drag.current.active = false
    if (drag.current.moved) setPaused(true)
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <button
      className={`little-cube${paused ? ' is-paused' : ''}${
        dragging ? ' is-dragging' : ''
      }`}
      type="button"
      aria-label={paused ? 'Resume cube rotation' : 'Pause cube rotation'}
      aria-pressed={paused}
      aria-describedby="cube-instructions"
      title="Drag to turn. Click to pause or resume."
      onPointerDown={(event) => {
        if (event.button !== 0) return
        drag.current = {
          active: true,
          moved: false,
          x: event.clientX,
          y: event.clientY,
          startX: event.clientX,
          startY: event.clientY,
        }
        setDragging(true)
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const current = drag.current
        if (!current.active) return
        const dx = event.clientX - current.x,
          dy = event.clientY - current.y
        if (
          Math.hypot(
            event.clientX - current.startX,
            event.clientY - current.startY
          ) > 3
        )
          current.moved = true
        turn(-dy * 1.2, dx * 1.2)
        current.x = event.clientX
        current.y = event.clientY
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onClick={() => {
        if (drag.current.moved) {
          drag.current.moved = false
          return
        }
        setPaused((value) => !value)
      }}
      onKeyDown={(event) => {
        const directions = {
          ArrowLeft: [0, -20],
          ArrowRight: [0, 20],
          ArrowUp: [-20, 0],
          ArrowDown: [20, 0],
        }
        if (!directions[event.key]) return
        event.preventDefault()
        turn(...directions[event.key])
        setPaused(true)
      }}
    >
      <span className="little-cube__pose" ref={poseRef} aria-hidden="true">
        <span className="little-cube__solid">
          <span className="little-cube__face little-cube__face--front">j</span>
          <span className="little-cube__face little-cube__face--back" />
          <span className="little-cube__face little-cube__face--right">z</span>
          <span className="little-cube__face little-cube__face--left" />
          <span className="little-cube__face little-cube__face--top" />
          <span className="little-cube__face little-cube__face--bottom" />
        </span>
      </span>
      <span className="sr-only" id="cube-instructions">
        Drag or use arrow keys to turn the cube. Click to pause or resume its
        slow rotation.
      </span>
    </button>
  )
}
