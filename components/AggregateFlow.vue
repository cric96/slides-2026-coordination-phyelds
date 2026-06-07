<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Cycles a soft highlight across the four conceptual stages so the
// "local network -> global field" transformation reads as a progression.
const stageCount = 4
const stage = ref(0)
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    stage.value = (stage.value + 1) % stageCount
  }, 1400)
})

onBeforeUnmount(() => {
  if (timer !== undefined) {
    window.clearInterval(timer)
  }
})

// A small irregular network of devices.
const nodes = [
  { x: 24, y: 30 },
  { x: 64, y: 18 },
  { x: 96, y: 50 },
  { x: 40, y: 64 },
  { x: 78, y: 78 },
  { x: 18, y: 92 },
  { x: 110, y: 90 },
  { x: 56, y: 104 },
]
const edges = [
  [0, 1], [1, 2], [0, 3], [3, 4], [2, 4],
  [3, 5], [4, 7], [4, 6], [5, 7], [6, 7],
]
</script>

<template>
  <div class="agg-flow">
    <!-- 1. Network of devices -->
    <div class="agg-stage" :class="{ 'is-active': stage === 0 }">
      <svg viewBox="0 0 128 128" class="agg-canvas">
        <line
          v-for="(e, i) in edges"
          :key="`e-${i}`"
          :x1="nodes[e[0]].x" :y1="nodes[e[0]].y"
          :x2="nodes[e[1]].x" :y2="nodes[e[1]].y"
          class="agg-edge"
        />
        <circle
          v-for="(n, i) in nodes"
          :key="`n-${i}`"
          :cx="n.x" :cy="n.y" r="6"
          class="agg-node"
        />
      </svg>
      <span class="agg-label">Network of devices</span>
      <span class="agg-sub">neighbour interaction</span>
    </div>

    <div class="agg-arrow" :class="{ 'is-active': stage === 1 }">→</div>

    <!-- 2. Continuum -->
    <div class="agg-stage" :class="{ 'is-active': stage === 1 }">
      <svg viewBox="0 0 128 128" class="agg-canvas">
        <defs>
          <radialGradient id="contGrad" cx="42%" cy="40%" r="75%">
            <stop offset="0%" stop-color="rgba(15,76,92,0.85)" />
            <stop offset="55%" stop-color="rgba(15,76,92,0.32)" />
            <stop offset="100%" stop-color="rgba(15,76,92,0.05)" />
          </radialGradient>
        </defs>
        <rect x="10" y="10" width="108" height="108" rx="4" fill="url(#contGrad)" />
        <circle
          v-for="(n, i) in nodes"
          :key="`cn-${i}`"
          :cx="n.x" :cy="n.y" r="2.4"
          class="agg-ghost-node"
        />
      </svg>
      <span class="agg-label">Computational field</span>
      <span class="agg-sub">value per device, over a continuum</span>
    </div>

    <div class="agg-arrow" :class="{ 'is-active': stage === 2 }">→</div>

    <!-- 3. Composition of fields -->
    <div class="agg-stage" :class="{ 'is-active': stage === 2 }">
      <svg viewBox="0 0 128 128" class="agg-canvas">
        <defs>
          <radialGradient id="fieldA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(217,119,6,0.8)" />
            <stop offset="100%" stop-color="rgba(217,119,6,0)" />
          </radialGradient>
          <radialGradient id="fieldB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(47,107,91,0.8)" />
            <stop offset="100%" stop-color="rgba(47,107,91,0)" />
          </radialGradient>
        </defs>
        <circle cx="46" cy="56" r="40" fill="url(#fieldA)" />
        <circle cx="84" cy="72" r="40" fill="url(#fieldB)" />
        <text x="64" y="118" text-anchor="middle" class="agg-op">f ∘ g</text>
      </svg>
      <span class="agg-label">Field composition</span>
      <span class="agg-sub">functional operators</span>
    </div>

    <div class="agg-arrow" :class="{ 'is-active': stage === 3 }">→</div>

    <!-- 4. Global effect -->
    <div class="agg-stage agg-stage-global" :class="{ 'is-active': stage === 3 }">
      <svg viewBox="0 0 128 128" class="agg-canvas">
        <defs>
          <radialGradient id="globalGrad" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stop-color="rgba(15,76,92,0.95)" />
            <stop offset="60%" stop-color="rgba(47,107,91,0.5)" />
            <stop offset="100%" stop-color="rgba(217,119,6,0.18)" />
          </radialGradient>
        </defs>
        <rect x="10" y="10" width="108" height="108" rx="4" fill="url(#globalGrad)" />
        <path d="M30 96 Q64 24 98 96" class="agg-channel" />
      </svg>
      <span class="agg-label">Collective behaviour</span>
      <span class="agg-sub">self-organising global effect</span>
    </div>
  </div>
</template>

<style scoped>
.agg-flow {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
}

.agg-stage {
  display: grid;
  justify-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.5rem 0.4rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 32, 43, 0.12);
  flex: 1 1 0;
  min-width: 0;
  transition: all 0.45s ease;
}

.agg-stage.is-active {
  border-color: var(--deck-teal);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 4px rgba(15, 76, 92, 0.1);
  transform: translateY(-2px);
}

.agg-canvas {
  width: 100%;
  max-width: 5.1rem;
  aspect-ratio: 1;
}

.agg-edge {
  stroke: rgba(15, 76, 92, 0.3);
  stroke-width: 2;
}

.agg-node {
  fill: var(--deck-teal);
}

.agg-ghost-node {
  fill: rgba(255, 255, 255, 0.85);
}

.agg-op {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  fill: var(--deck-ink);
}

.agg-channel {
  fill: none;
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 6 8;
}

.agg-stage.is-active .agg-channel {
  animation: channel-flow 3s linear infinite;
}

.agg-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--deck-muted, #52616d);
  text-align: center;
  line-height: 1.15;
}

.agg-stage.is-active .agg-label {
  color: var(--deck-teal);
}

.agg-sub {
  font-size: 0.64rem;
  font-weight: 500;
  color: rgba(82, 97, 109, 0.78);
  text-align: center;
  line-height: 1.1;
  margin-top: -0.25rem;
}

.agg-arrow {
  display: grid;
  place-items: center;
  font-size: 1.3rem;
  color: rgba(16, 32, 43, 0.28);
  transition: color 0.45s ease, transform 0.45s ease;
}

.agg-arrow.is-active {
  color: var(--deck-orange);
  transform: scale(1.25);
}

@keyframes channel-flow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -56; }
}
</style>
