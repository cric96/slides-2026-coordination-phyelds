<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Cell = {
  x: number
  y: number
  distance: number
}

const size = 7
const intentCell = { x: 1, y: 5 }
const stages = [0.15, 1.6, 2.7, 4.2, 10]
const stage = ref(0)

const cells: Cell[] = Array.from({ length: size * size }, (_, index) => {
  const x = index % size
  const y = Math.floor(index / size)
  return {
    x,
    y,
    distance: Math.hypot(x - intentCell.x, y - intentCell.y),
  }
})

let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => {
    stage.value = (stage.value + 1) % stages.length
  }, 950)
})

onBeforeUnmount(() => {
  if (timer !== undefined) {
    window.clearInterval(timer)
  }
})

function cellStyle(cell: Cell) {
  if (cell.x === intentCell.x && cell.y === intentCell.y) {
    return {
      background: 'var(--deck-orange, #d97706)',
      borderColor: 'var(--deck-orange, #d97706)',
      transform: 'scale(1.06)',
      boxShadow: '0 0 0 8px rgba(217, 119, 6, 0.16)',
    }
  }
  if (cell.distance > stages[stage.value]) {
    return {
      background: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(16, 32, 43, 0.08)',
      transform: 'scale(1)',
      boxShadow: 'none',
    }
  }
  const strength = Math.max(0.22, 1 - cell.distance / 7)
  return {
    background: `rgba(15, 76, 92, ${0.18 + strength * 0.75})`,
    borderColor: 'rgba(15, 76, 92, 0.35)',
    transform: 'scale(1)',
    boxShadow: 'none',
  }
}
</script>

<template>
  <div class="field-shell">
    <div class="field-grid" :style="{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }">
      <div
        v-for="cell in cells"
        :key="`${cell.x}-${cell.y}`"
        class="field-cell"
        :style="cellStyle(cell)"
      >
        <span v-if="cell.x === intentCell.x && cell.y === intentCell.y" class="field-source">S</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-shell {
  display: grid;
  gap: 0.9rem;
  justify-items: center;
}

.field-grid {
  display: grid;
  gap: 0.45rem;
  width: min(100%, 19rem);
}

.field-cell {
  aspect-ratio: 1;
  border-radius: 0;
  border: 1px solid rgba(16, 32, 43, 0.08);
  display: grid;
  place-items: center;
  transition: all 0.5s ease;
}

.field-source {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
}

.field-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
}

.legend-chip {
  padding: 0.2rem 0.55rem;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(16, 32, 43, 0.08);
  font-size: 0.78rem;
  color: #52616d;
  transition: all 0.3s ease;
}

.legend-chip.active {
  color: var(--deck-orange, #d97706);
  border-color: rgba(217, 119, 6, 0.18);
  background: var(--deck-orange-soft, #f8ead7);
  font-weight: 500;
}
</style>