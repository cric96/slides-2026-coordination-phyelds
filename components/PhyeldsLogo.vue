<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Palette = {
  start: [number, number, number]
  end: [number, number, number]
}

type NodePoint = {
  id: number
  baseX: number
  baseY: number
  phaseX: number
  phaseY: number
  x?: number
  y?: number
  color?: string
}

const canvas = ref<HTMLCanvasElement | null>(null)

const speed = 0.8
const colorSpeed = 2
const amplitude = 5

const palettes: Palette[] = [
  { start: [245, 130, 32], end: [229, 28, 117] },
  { start: [229, 28, 117], end: [122, 31, 162] },
  { start: [122, 31, 162], end: [25, 118, 210] },
  { start: [25, 118, 210], end: [0, 150, 136] },
  { start: [0, 150, 136], end: [245, 130, 32] },
]

const nodes: NodePoint[] = [
  { id: 0, baseX: 203, baseY: 420, phaseX: 0.1, phaseY: 1.2 },
  { id: 1, baseX: 203, baseY: 340, phaseX: 2.3, phaseY: 3.4 },
  { id: 2, baseX: 203, baseY: 260, phaseX: 4.5, phaseY: 5.6 },
  { id: 3, baseX: 203, baseY: 180, phaseX: 6.7, phaseY: 7.8 },
  { id: 4, baseX: 259, baseY: 420, phaseX: 1.2, phaseY: 2.3 },
  { id: 5, baseX: 259, baseY: 340, phaseX: 3.4, phaseY: 4.5 },
  { id: 6, baseX: 259, baseY: 260, phaseX: 5.6, phaseY: 6.7 },
  { id: 7, baseX: 259, baseY: 180, phaseX: 7.8, phaseY: 8.9 },
  { id: 8, baseX: 315, baseY: 184, phaseX: 9.0, phaseY: 1.1 },
  { id: 9, baseX: 367, baseY: 216, phaseX: 2.2, phaseY: 3.3 },
  { id: 10, baseX: 387, baseY: 268, phaseX: 4.4, phaseY: 5.5 },
  { id: 11, baseX: 367, baseY: 320, phaseX: 6.6, phaseY: 7.7 },
  { id: 12, baseX: 315, baseY: 352, phaseX: 8.8, phaseY: 9.9 },
  { id: 13, baseX: 295, baseY: 232, phaseX: 1.5, phaseY: 2.7 },
  { id: 14, baseX: 331, baseY: 268, phaseX: 3.7, phaseY: 4.9 },
  { id: 15, baseX: 295, baseY: 304, phaseX: 5.9, phaseY: 7.1 },
]

const edges: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7],
  [0, 4], [1, 5], [2, 6], [3, 7],
  [0, 5], [4, 1], [1, 6], [5, 2], [2, 7], [6, 3],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 5],
  [7, 13], [13, 6], [8, 13], [8, 14], [9, 13], [9, 14],
  [10, 14], [10, 15], [11, 14], [11, 15], [11, 12], [12, 15],
  [15, 6], [15, 5],
]

let animationId = 0
let lastTime = 0
let motionAngle = 0
let colorAngle = 0

function getDynamicColor(x: number, progress: number) {
  const minX = 203
  const maxX = 387
  const spatialT = Math.max(0, Math.min(1, (x - minX) / (maxX - minX)))
  const cycleSpeed = 0.05

  let timeProgress = (progress * cycleSpeed) % palettes.length
  if (timeProgress < 0) {
    timeProgress += palettes.length
  }

  const currentIndex = Math.floor(timeProgress)
  const nextIndex = (currentIndex + 1) % palettes.length
  const mix = timeProgress - currentIndex
  const current = palettes[currentIndex]
  const next = palettes[nextIndex]

  const startR = current.start[0] + (next.start[0] - current.start[0]) * mix
  const startG = current.start[1] + (next.start[1] - current.start[1]) * mix
  const startB = current.start[2] + (next.start[2] - current.start[2]) * mix
  const endR = current.end[0] + (next.end[0] - current.end[0]) * mix
  const endG = current.end[1] + (next.end[1] - current.end[1]) * mix
  const endB = current.end[2] + (next.end[2] - current.end[2]) * mix

  const red = Math.round(startR + (endR - startR) * spatialT)
  const green = Math.round(startG + (endG - startG) * spatialT)
  const blue = Math.round(startB + (endB - startB) * spatialT)

  return `rgb(${red}, ${green}, ${blue})`
}

function animate(timestamp: number) {
  const element = canvas.value
  if (!element) {
    return
  }

  const context = element.getContext('2d')
  if (!context) {
    return
  }

  if (!lastTime) {
    lastTime = timestamp
  }

  const dt = (timestamp - lastTime) * 0.001
  lastTime = timestamp
  motionAngle += dt * speed * 2
  colorAngle += dt * colorSpeed * 2

  context.clearRect(0, 0, element.width, element.height)
  context.fillStyle = 'rgba(255, 255, 255, 0.0)'
  context.fillRect(0, 0, element.width, element.height)

  for (const node of nodes) {
    node.x = node.baseX + Math.sin(motionAngle + node.phaseX) * amplitude
    node.y = node.baseY + Math.cos(motionAngle + node.phaseY) * amplitude
    node.color = getDynamicColor(node.x, colorAngle)
  }

  for (const [source, target] of edges) {
    const first = nodes[source]
    const second = nodes[target]
    if (first.x === undefined || first.y === undefined || second.x === undefined || second.y === undefined) {
      continue
    }

    const gradient = context.createLinearGradient(first.x, first.y, second.x, second.y)
    gradient.addColorStop(0, first.color ?? '#0f4c5c')
    gradient.addColorStop(1, second.color ?? '#d97706')

    context.beginPath()
    context.moveTo(first.x, first.y)
    context.lineTo(second.x, second.y)
    context.strokeStyle = gradient
    context.lineWidth = 4
    context.lineCap = 'round'
    context.stroke()
  }

  for (const node of nodes) {
    if (node.x === undefined || node.y === undefined) {
      continue
    }

    context.beginPath()
    context.arc(node.x, node.y, 8, 0, Math.PI * 2)
    context.fillStyle = node.color ?? '#0f4c5c'
    context.fill()
    context.strokeStyle = '#FAF8F5'
    context.lineWidth = 1.5
    context.stroke()
  }

  const textGradient = context.createLinearGradient(203, 0, 387, 0)
  textGradient.addColorStop(0, getDynamicColor(203, colorAngle))
  textGradient.addColorStop(1, getDynamicColor(387, colorAngle))
  context.fillStyle = textGradient
  context.font = 'bold 100px sans-serif'
  context.textAlign = 'center'
  context.fillText('PHYELDS', 295, 540)

  animationId = window.requestAnimationFrame(animate)
}

onMounted(() => {
  animationId = window.requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationId) {
    window.cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="phyelds-logo-shell">
    <canvas ref="canvas" class="phyelds-logo-canvas" width="600" height="600"></canvas>
  </div>
</template>

<style scoped>
.phyelds-logo-shell {
  width: 100%;
  max-width: 280px; /* Regola questo valore per cambiare la dimensione totale del quadrato */
  margin: 0 auto;   /* Centra il contenitore se inserito in aree più larghe */
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.phyelds-logo-canvas {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>