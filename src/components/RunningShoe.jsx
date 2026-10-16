import { useEffect, useRef, useState } from 'react'

// Cross sections of the upper: heel to toe, with height and half-width.
const sections = [
  [-1.6, 0.38, 0.17],
  [-1.48, 0.65, 0.35],
  [-1.22, 0.56, 0.41],
  [-0.95, 0.44, 0.4],
  [-0.65, 0.6, 0.38],
  [-0.4, 0.74, 0.38],
  [-0.15, 0.65, 0.41],
  [0.15, 0.45, 0.46],
  [0.55, 0.3, 0.52],
  [0.95, 0.24, 0.51],
  [1.3, 0.22, 0.38],
  [1.5, 0.1, 0.1],
]
const palette = {
  upper: [228, 233, 232],
  heel: [250, 251, 249],
  toe: [248, 250, 249],
  stripe: [45, 51, 51],
  stripeInside: [235, 240, 237],
}
const lace = [251, 252, 249]
const rubber = [214, 218, 218]
const initialPose = { x: 0.23, y: Math.PI - 0.2 }
const base = (x) => 0.22 + 0.18 * Math.max(0, x - 0.65) ** 2

function profile(x) {
  const i = Math.max(
    1,
    sections.findIndex((section) => section[0] >= x)
  )
  const a = sections[i - 1],
    b = sections[i]
  const t = Math.max(0, Math.min(1, (x - a[0]) / (b[0] - a[0])))
  return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

function surface(x, z) {
  const [h, w] = profile(x)
  return [x, base(x) + h * Math.sqrt(Math.max(0, 1 - (z / w) ** 2)), z]
}

function makeShoe(palette) {
  const faces = []
  const add = (points, fill) => faces.push({ points, fill })
  const rings = sections.map(([x, h, w]) =>
    Array.from({ length: 25 }, (_, i) => {
      const angle = (i / 24) * Math.PI
      return [x, base(x) + Math.sin(angle) * h, Math.cos(angle) * w]
    })
  )
  for (let i = 0; i < rings.length - 1; i++) {
    for (let j = 0; j < 24; j++) {
      add(
        [rings[i][j], rings[i + 1][j], rings[i + 1][j + 1], rings[i][j + 1]],
        palette.upper
      )
    }
  }
  add(rings[0], palette.upper)
  add(rings[rings.length - 1], palette.upper)

  const outline = [
    ...sections.map(([x, , w]) => [x, w + 0.06]),
    ...sections
      .slice()
      .reverse()
      .map(([x, , w]) => [x, -w - 0.06]),
  ]

  // Layered, flared foam follows the rocker at the toe and heel.
  const solePoint = ([x, z], layer) => {
    const bottom =
      -0.47 +
      0.45 * Math.max(0, x - 0.65) ** 2 +
      0.2 * Math.max(0, -x - 0.85) ** 2
    const flare = 1 + Math.sin(layer * Math.PI) * 0.2
    const ridge =
      Math.sin(layer * Math.PI) * (0.055 * Math.sin(x * 3.1) + 0.045 * x)
    return [
      x * (1 + Math.sin(layer * Math.PI) * 0.055),
      bottom + (base(x) - bottom) * layer + ridge,
      z * flare,
    ]
  }
  const layers = [0, 0.07, 0.26, 0.51, 0.7, 0.88, 1]
  for (let layer = 0; layer < layers.length - 1; layer++) {
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i],
        b = outline[(i + 1) % outline.length]
      const t = Math.max(0, Math.min(1, ((a[0] + b[0]) / 2 + 0.7) / 1.9))
      const fill =
        layer === 0
          ? rubber
          : palette.heel.map((n, c) =>
              Math.round(
                (n + (palette.toe[c] - n) * t) * (layer === 2 ? 0.98 : 1)
              )
            )
      add(
        [
          solePoint(a, layers[layer]),
          solePoint(b, layers[layer]),
          solePoint(b, layers[layer + 1]),
          solePoint(a, layers[layer + 1]),
        ],
        fill
      )
    }
  }
  add(
    outline.map((point) => solePoint(point, 0)),
    rubber
  )

  // Collar and laces sit above the silver-white knitted upper.
  add(
    Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2
      return [-1.12 + Math.cos(angle) * 0.23, 0.76, Math.sin(angle) * 0.22]
    }),
    [141, 150, 148]
  )
  for (let i = 0; i < 5; i++) {
    const x = -0.38 + i * 0.19
    for (let j = 0; j < 8; j++) {
      const z = -0.27 + j * 0.0675
      add(
        [
          [x - 0.025, z],
          [x + 0.025, z],
          [x + 0.025, z + 0.0675],
          [x - 0.025, z + 0.0675],
        ].map(([px, pz]) => {
          const p = surface(px, pz)
          p[1] += 0.022
          return p
        }),
        lace
      )
    }
  }
  // Wrap the crossing side stripes and small knit stitches onto the mesh.
  for (const side of [-1, 1]) {
    const point = (x, fraction, lift = 0.018) => {
      const [h, w] = profile(x)
      return [
        x,
        base(x) + fraction * h,
        side * (w * Math.sqrt(1 - fraction ** 2) + lift),
      ]
    }
    for (let x = -1.35; x < 1.3; x += 0.09) {
      for (let f = 0.17; f < 0.88; f += 0.15) {
        add(
          [
            point(x - 0.014, f),
            point(x, f + 0.018),
            point(x + 0.014, f),
            point(x, f - 0.018),
          ],
          palette.upper.map((n) => n * 0.93)
        )
      }
    }
    const stripes = [
      [-1.26, 0.84, 0.76, 0.08],
      [-0.96, 0.9, 1.02, 0.09],
      [-0.82, 0.06, -0.08, 0.87],
      [-0.3, 0.06, 0.4, 0.86],
    ]
    for (const [x1, f1, x2, f2] of stripes) {
      for (let j = 0; j < 24; j++) {
        const t = j / 24,
          next = (j + 1) / 24
        for (const [width, lift, fill] of [
          [0.064, 0.022, palette.stripe],
          [0.044, 0.026, palette.stripeInside],
        ]) {
          const p = (v, offset) =>
            point(x1 + (x2 - x1) * v, f1 + (f2 - f1) * v + offset, lift)
          add(
            [p(t, -width), p(next, -width), p(next, width), p(t, width)],
            fill
          )
        }
      }
    }
  }
  return faces
}

function drawShoe(canvas, pose, color) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, 3)
  canvas.width = 240 * dpr
  canvas.height = 180 * dpr
  ctx.scale(dpr, dpr)
  const rotate = ([x, y, z]) => {
    y -= 0.28
    const rx = x * Math.cos(pose.y) + z * Math.sin(pose.y)
    const rz = -x * Math.sin(pose.y) + z * Math.cos(pose.y)
    return [
      rx,
      y * Math.cos(pose.x) - rz * Math.sin(pose.x),
      y * Math.sin(pose.x) + rz * Math.cos(pose.x),
    ]
  }
  const faces = makeShoe(color)
    .map((face) => {
      const points = face.points.map(rotate)
      return {
        ...face,
        points,
        depth: points.reduce((sum, p) => sum + p[2], 0) / points.length,
      }
    })
    .sort((a, b) => a.depth - b.depth)

  ctx.save()
  ctx.translate(120, 143)
  ctx.scale(1, 0.16)
  const shadow = ctx.createRadialGradient(0, 0, 5, 0, 0, 78)
  shadow.addColorStop(0, '#50433125')
  shadow.addColorStop(1, '#50433100')
  ctx.fillStyle = shadow
  ctx.fillRect(-80, -80, 160, 160)
  ctx.restore()

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const depth = new Float32Array(canvas.width * canvas.height).fill(-Infinity)
  const project = ([x, y, z]) => [(120 + x * 58) * dpr, (88 - y * 58) * dpr, z]
  const edge = (a, b, x, y) =>
    (x - a[0]) * (b[1] - a[1]) - (y - a[1]) * (b[0] - a[0])

  // Depth-test the small mesh so the side graphics follow the upper cleanly
  // from every angle, including while it is being dragged.
  const triangle = (a, b, c, fill) => {
    const area = edge(a, b, c[0], c[1])
    if (Math.abs(area) < 0.001) return
    const left = Math.max(0, Math.floor(Math.min(a[0], b[0], c[0])))
    const right = Math.min(
      canvas.width - 1,
      Math.ceil(Math.max(a[0], b[0], c[0]))
    )
    const top = Math.max(0, Math.floor(Math.min(a[1], b[1], c[1])))
    const bottom = Math.min(
      canvas.height - 1,
      Math.ceil(Math.max(a[1], b[1], c[1]))
    )
    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        const wa = edge(b, c, x + 0.5, y + 0.5) / area
        const wb = edge(c, a, x + 0.5, y + 0.5) / area
        const wc = 1 - wa - wb
        if (wa < 0 || wb < 0 || wc < 0) continue
        const z = wa * a[2] + wb * b[2] + wc * c[2]
        const index = y * canvas.width + x
        if (z < depth[index]) continue
        depth[index] = z
        const pixel = index * 4
        pixels.data[pixel] = fill[0]
        pixels.data[pixel + 1] = fill[1]
        pixels.data[pixel + 2] = fill[2]
        pixels.data[pixel + 3] = 255
      }
    }
  }

  for (const face of faces) {
    const [a, b, c] = face.points
    const u = b.map((v, i) => v - a[i]),
      v = c.map((n, i) => n - a[i])
    const normal = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ]
    const length = Math.hypot(...normal) || 1
    const light =
      0.72 +
      0.28 *
        Math.abs(
          (-normal[0] * 0.3 + normal[1] * 0.8 + normal[2] * 0.5) / length
        )
    const fill = face.fill.map((n) => Math.round(n * light))
    const points = face.points.map(project)
    for (let i = 1; i < points.length - 1; i++) {
      triangle(points[0], points[i], points[i + 1], fill)
    }
  }
  ctx.putImageData(pixels, 0, 0)
}

export default function RunningShoe() {
  const canvas = useRef(null)
  const pose = useRef({ ...initialPose })
  const drag = useRef(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    drawShoe(canvas.current, pose.current, palette)
  }, [])

  const turn = (x, y) => {
    pose.current.x = Math.max(-1.2, Math.min(1.2, pose.current.x + x))
    pose.current.y += y
    drawShoe(canvas.current, pose.current, palette)
  }

  return (
    <button
      type="button"
      className={`running-shoe${dragging ? ' is-dragging' : ''}`}
      aria-label="White and silver 3D running shoe. Use arrow keys to turn, or click to reset."
      title="Drag to turn · click to reset"
      onPointerDown={(event) => {
        if (event.button !== 0) return
        drag.current = { x: event.clientX, y: event.clientY, distance: 0 }
        event.currentTarget.setPointerCapture(event.pointerId)
        setDragging(true)
      }}
      onPointerMove={(event) => {
        if (
          !drag.current ||
          !event.currentTarget.hasPointerCapture(event.pointerId)
        )
          return
        const dx = event.clientX - drag.current.x,
          dy = event.clientY - drag.current.y
        drag.current.distance += Math.hypot(dx, dy)
        drag.current.x = event.clientX
        drag.current.y = event.clientY
        turn(dy * 0.012, dx * 0.018)
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId)
        setDragging(false)
      }}
      onPointerCancel={() => {
        drag.current = null
        setDragging(false)
      }}
      onLostPointerCapture={() => setDragging(false)}
      onClick={(event) => {
        if (event.detail === 0 || !drag.current || drag.current.distance < 4) {
          pose.current = { ...initialPose }
          drawShoe(canvas.current, pose.current, palette)
        }
        drag.current = null
      }}
      onKeyDown={(event) => {
        const directions = {
          ArrowLeft: [0, -0.2],
          ArrowRight: [0, 0.2],
          ArrowUp: [-0.15, 0],
          ArrowDown: [0.15, 0],
        }
        if (!directions[event.key]) return
        event.preventDefault()
        turn(...directions[event.key])
      }}
    >
      <canvas ref={canvas} width="240" height="180" aria-hidden="true" />
      <span className="running-shoe__hint" aria-hidden="true">
        give it a spin
      </span>
    </button>
  )
}
