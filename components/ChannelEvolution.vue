<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  click?: number
}>()

type Cell = {
  x: number
  y: number
}

const size = 11
const source = { x: 1, y: 9 }
const target = { x: 9, y: 1 }
const stage = ref(0)
const stageNames = ['endpoints', 'source gradient', 'target gradient', 'broadcast d(S,T)', 'channel']

const cells: Cell[] = Array.from({ length: size * size }, (_, index) => ({
  x: index % size,
  y: Math.floor(index / size),
}))

let timer: number | undefined

onMounted(() => {
  if (props.click === undefined) {
    timer = window.setInterval(() => {
      stage.value = (stage.value + 1) % stageNames.length
    }, 1200)
  }
})

watch(() => props.click, (newClick) => {
  if (newClick !== undefined) {
    if (newClick <= 1) {
      stage.value = 0
    } else if (newClick === 2) {
      stage.value = 1
    } else if (newClick === 3) {
      stage.value = 2
    } else if (newClick === 4) {
      stage.value = 3
    } else {
      stage.value = 4
    }
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (timer !== undefined) {
    window.clearInterval(timer)
  }
})

function gradientDistance(cell: Cell) {
  return Math.hypot(cell.x - target.x, cell.y - target.y)
}

function sourceDistance(cell: Cell) {
  return Math.hypot(cell.x - source.x, cell.y - source.y)
}

function lineDistance(cell: Cell) {
  return Math.abs(cell.x + cell.y - 10) / Math.sqrt(2)
}

function isChannel(cell: Cell) {
  return lineDistance(cell) <= 1.55 && cell.x >= 0 && cell.x <= 10 && cell.y >= 0 && cell.y <= 10
}

function cellStyle(cell: Cell) {
  if (cell.x === source.x && cell.y === source.y) {
    return {
      background: '#2f6b5b',
      borderColor: '#2f6b5b',
      color: '#fff',
    }
  }
  if (cell.x === target.x && cell.y === target.y) {
    return {
      background: '#d97706',
      borderColor: '#d97706',
      color: '#fff',
    }
  }

  if (stage.value === 0) {
    return {
      background: 'rgba(255, 255, 255, 0.88)',
      borderColor: 'rgba(16, 32, 43, 0.08)',
      color: '#52616d',
    }
  }

  if (stage.value === 1) {
    const distS = sourceDistance(cell)
    const strengthS = Math.max(0.1, 1 - distS / 13)
    return {
      background: `rgba(47, 107, 91, ${0.12 + strengthS * 0.78})`,
      borderColor: 'rgba(47, 107, 91, 0.26)',
      color: '#10202b',
    }
  }

  if (stage.value === 2) {
    const distT = gradientDistance(cell)
    const strengthT = Math.max(0.1, 1 - distT / 13)
    return {
      background: `rgba(217, 119, 6, ${0.12 + strengthT * 0.78})`,
      borderColor: 'rgba(217, 119, 6, 0.26)',
      color: '#10202b',
    }
  }

  if (stage.value === 3) {
    // broadcast: the source-to-target distance d(S,T) is shared network-wide,
    // so every device ends up holding the SAME constant value -> a homogeneous field.
    return {
      background: 'rgba(15, 76, 92, 0.5)',
      borderColor: 'rgba(15, 76, 92, 0.45)',
      color: '#fff',
    }
  }

  // stage === 4 (channel): the channel is a boolean field, so every cell
  // inside it holds the same value and gets the same color.
  if (isChannel(cell)) {
    return {
      background: '#d97706',
      borderColor: '#d97706',
      color: '#fff',
    }
  }
  return {
    background: 'rgba(255, 255, 255, 0.88)',
    borderColor: 'rgba(16, 32, 43, 0.08)',
    color: '#52616d',
  }
}
</script>

<template>
  <div class="channel-shell">
    <div class="channel-grid" :style="{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }">
      <div
        v-for="cell in cells"
        :key="`${cell.x}-${cell.y}`"
        class="channel-cell"
        :style="cellStyle(cell)"
      >
        <span v-if="cell.x === source.x && cell.y === source.y">S</span>
        <span v-else-if="cell.x === target.x && cell.y === target.y">T</span>
      </div>
    </div>
    <div class="channel-stages">
      <span
        v-for="(name, index) in stageNames"
        :key="name"
        class="channel-stage"
        :class="{ active: stage === index }"
      >
        {{ name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.channel-shell {
  display: grid;
  gap: 0.8rem;
  justify-items: center;
}

.channel-grid {
  display: grid;
  gap: 0.28rem;
  width: min(100%, 18rem);
}

.channel-cell {
  aspect-ratio: 1;
  border-radius: 0.52rem;
  border: 1px solid rgba(16, 32, 43, 0.08);
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  font-weight: 600;
  transition: all 0.45s ease;
}

.channel-stages {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.42rem;
}

.channel-stage {
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(16, 32, 43, 0.08);
  color: #52616d;
  font-size: 0.76rem;
}

.channel-stage.active {
  color: #d97706;
  border-color: rgba(217, 119, 6, 0.26);
  background: rgba(248, 234, 215, 0.9);
}
</style>