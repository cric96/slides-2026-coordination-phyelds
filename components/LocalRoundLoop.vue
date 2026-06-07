<script setup>
import { computed } from 'vue'

const props = defineProps({
  click: {
    type: [Number, String],
    default: 0
  }
})

// Convert to number if passed as string
const currentClick = computed(() => {
  const val = Number(props.click)
  return isNaN(val) ? 0 : val
})

const activePhase = computed(() => {
  // Click 1 -> Sense
  // Click 2 -> Compute
  // Click 3 -> Interact/Act
  // Click 0 or >= 4 -> All active
  if (currentClick.value === 1) return 'sense'
  if (currentClick.value === 2) return 'compute'
  if (currentClick.value === 3) return 'interact'
  return 'all'
})
</script>

<template>
  <div class="loop-shell">
    <svg viewBox="0 0 520 360" class="loop-svg" aria-hidden="true">
      <!-- Arc pathways -->
      <path d="M142 110 C 212 62, 308 62, 378 110" class="loop-arc" :class="{ 'is-active': activePhase === 'all' }"></path>
      <path d="M394 142 C 422 198, 416 255, 362 296" class="loop-arc" :class="{ 'is-active': activePhase === 'interact' || activePhase === 'all' }"></path>
      <path d="M160 296 C 106 255, 98 198, 126 142" class="loop-arc" :class="{ 'is-active': activePhase === 'sense' || activePhase === 'all' }"></path>
      
      <!-- Neighbor links -->
      <line x1="120" y1="180" x2="225" y2="180" class="nbr-line" :class="{ 'is-active': activePhase === 'sense' || activePhase === 'all' }"></line>
      <line x1="295" y1="180" x2="400" y2="180" class="nbr-line" :class="{ 'is-active': activePhase === 'interact' || activePhase === 'all' }"></line>
      
      <!-- Message dots -->
      <circle cx="148" cy="180" r="7" class="msg-dot msg-dot-in" :class="{ 'is-active': activePhase === 'sense' || activePhase === 'all' }"></circle>
      <circle cx="372" cy="180" r="7" class="msg-dot msg-dot-out" :class="{ 'is-active': activePhase === 'interact' || activePhase === 'all' }"></circle>
    </svg>

    <div class="phase phase-sense" :class="{ 'is-active': activePhase === 'sense' || activePhase === 'all', 'is-dimmed': activePhase !== 'sense' && activePhase !== 'all' }">Sense</div>
    <div class="phase phase-compute" :class="{ 'is-active': activePhase === 'compute' || activePhase === 'all', 'is-dimmed': activePhase !== 'compute' && activePhase !== 'all' }">Compute</div>
    <div class="phase phase-interact" :class="{ 'is-active': activePhase === 'interact' || activePhase === 'all', 'is-dimmed': activePhase !== 'interact' && activePhase !== 'all' }">Interact</div>

    <div class="device core-device" :class="{ 'is-active': activePhase === 'compute' || activePhase === 'all' }">device</div>
    <div class="device neighbor neighbor-left">nbr</div>
    <div class="device neighbor neighbor-right">nbr</div>
  </div>
</template>

<style scoped>
.loop-shell {
  position: relative;
  width: 100%;
  min-height: 18rem;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 32, 43, 0.12);
  overflow: hidden;
}

.loop-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.loop-arc,
.nbr-line {
  fill: none;
  stroke: rgba(15, 76, 92, 0.15);
  stroke-width: 4;
  stroke-linecap: square;
  stroke-dasharray: 8 12;
  transition: stroke 0.3s ease;
}

.loop-arc.is-active,
.nbr-line.is-active {
  stroke: rgba(15, 76, 92, 0.55);
}

.loop-arc.is-active {
  animation: arc-flow 4.8s linear infinite;
}

.msg-dot {
  fill: #d97706;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.msg-dot.is-active {
  opacity: 1;
}

.msg-dot-in.is-active {
  animation: msg-in 2.2s ease-in-out infinite;
}

.msg-dot-out.is-active {
  animation: msg-out 2.2s ease-in-out infinite;
}

.device,
.phase {
  position: absolute;
  display: grid;
  place-items: center;
  border-radius: 0;
  font-weight: 600;
  transition: all 0.3s ease;
}

.core-device {
  left: 50%;
  top: 50%;
  width: 4.9rem;
  height: 4.9rem;
  transform: translate(-50%, -50%);
  background: #0f4c5c;
  color: white;
  box-shadow: 0 0 0 10px rgba(15, 76, 92, 0.08);
}

.core-device.is-active {
  box-shadow: 0 0 0 14px rgba(15, 76, 92, 0.22);
  scale: 1.05;
}

.neighbor {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.92);
  color: #52616d;
  border: 1px solid rgba(16, 32, 43, 0.12);
  top: 50%;
  transform: translateY(-50%);
}

.neighbor-left {
  left: 3.6rem;
}

.neighbor-right {
  right: 3.6rem;
}

.phase {
  width: 6rem;
  height: 2.3rem;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(16, 32, 43, 0.1);
  color: #10202b;
  opacity: 0.4;
}

.phase.is-active {
  opacity: 1;
  scale: 1.05;
  border-width: 1.5px;
}

.phase-sense {
  left: 50%;
  top: 1.6rem;
  transform: translateX(-50%);
}
.phase-sense.is-active {
  border-color: #d97706;
  color: #d97706;
  box-shadow: 0 0 12px rgba(217, 119, 6, 0.2);
  animation: pulse-sense 2s ease-in-out infinite;
}

.phase-compute {
  right: 2.2rem;
  bottom: 2rem;
}
.phase-compute.is-active {
  border-color: #0f4c5c;
  color: #0f4c5c;
  box-shadow: 0 0 12px rgba(15, 76, 92, 0.2);
  animation: pulse-compute 2s ease-in-out infinite;
}

.phase-interact {
  left: 2.2rem;
  bottom: 2rem;
}
.phase-interact.is-active {
  border-color: #2f6b5b;
  color: #2f6b5b;
  box-shadow: 0 0 12px rgba(47, 107, 91, 0.2);
  animation: pulse-interact 2s ease-in-out infinite;
}

.phase.is-dimmed {
  opacity: 0.25;
}

@keyframes arc-flow {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -120;
  }
}

@keyframes msg-in {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.15;
  }
  45% {
    transform: translateX(78px);
    opacity: 1;
  }
}

@keyframes msg-out {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.15;
  }
  45% {
    transform: translateX(-78px);
    opacity: 1;
  }
}

@keyframes pulse-sense {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(217, 119, 6, 0);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(217, 119, 6, 0.15);
  }
}

@keyframes pulse-compute {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(15, 76, 92, 0);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(15, 76, 92, 0.15);
  }
}

@keyframes pulse-interact {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(47, 107, 91, 0);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(47, 107, 91, 0.15);
  }
}
</style>