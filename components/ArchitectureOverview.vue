<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    click?: number
  }>(),
  {
    click: 2,
  }
)
</script>

<template>
  <div class="arch-shell">
    <div class="arch-layer arch-layer-top">
      <div class="arch-box arch-box-library" :class="{ 'is-inactive': click < 2 }">
        <div class="arch-kicker">Reusable coordination</div>
        <div class="arch-title">Library</div>
        <div class="arch-text">gradients, broadcast, collect, gossip, leaders</div>
      </div>
      <div class="arch-box arch-box-simulator" :class="{ 'is-inactive': click < 2 }">
        <div class="arch-kicker">Execution contexts</div>
        <div class="arch-title">Simulator</div>
        <div class="arch-text">native simulator, VMAS, and external integrations</div>
      </div>
    </div>

    <div class="arch-arrows arch-arrows-top" aria-hidden="true">
      <span class="arch-arrow" :class="{ 'is-inactive': click < 2 }"></span>
      <span class="arch-arrow" :class="{ 'is-inactive': click < 2 }"></span>
    </div>

    <div class="arch-layer arch-layer-middle">
      <div class="arch-box arch-box-calculus" :class="{ 'is-inactive': click < 1 }">
        <div class="arch-kicker">Programming model</div>
        <div class="arch-title">Calculus</div>
        <div class="arch-text">@aggregate, remember, neighbors, alignment-aware execution</div>
      </div>
    </div>

    <div class="arch-arrows arch-arrows-bottom" aria-hidden="true">
      <span class="arch-arrow" :class="{ 'is-inactive': click < 1 }"></span>
    </div>

    <div class="arch-layer arch-layer-bottom">
      <div class="arch-box arch-box-core">
        <div class="arch-kicker">Execution core</div>
        <div class="arch-title">VM + Data</div>
        <div class="arch-text">engine, state, neighborhood fields, round orchestration</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arch-shell {
  width: min(100%, 52rem);
  margin: 0 auto;
  display: grid;
  gap: 0.4rem;
}

.arch-layer {
  display: grid;
  justify-content: center;
}

.arch-layer-top {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.arch-layer-middle,
.arch-layer-bottom {
  grid-template-columns: minmax(0, 32rem);
}

.arch-box {
  position: relative;
  padding: 0.6rem 0.9rem;
  border-radius: 0;
  border: 1px solid rgba(16, 32, 43, 0.12);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.arch-box-library {
  border-top: 4px solid var(--deck-teal, #0f4c5c);
}

.arch-box-simulator {
  border-top: 4px solid var(--deck-green, #2f6b5b);
}

.arch-box-calculus {
  border-top: 4px solid var(--deck-orange, #d97706);
}

.arch-box-core {
  border-top: 4px solid var(--deck-teal, #0f4c5c);
}

.arch-kicker {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #52616d;
  margin-bottom: 0.15rem;
}

.arch-title {
  position: relative;
  font-size: 1.0rem;
  font-weight: 600;
  color: #10202b;
  margin-bottom: 0.15rem;
}

.arch-text {
  position: relative;
  color: #52616d;
  line-height: 1.35;
  font-size: 0.82rem;
}

.arch-arrows {
  display: flex;
  justify-content: center;
  gap: 8.8rem;
}

.arch-arrows-bottom {
  gap: 0;
}

.arch-arrow {
  width: 0.14rem;
  height: 0.65rem;
  background: rgba(15, 76, 92, 0.35);
  border-radius: 0;
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.arch-arrow::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -0.05rem;
  transform: translateX(-50%);
  border-left: 0.25rem solid transparent;
  border-right: 0.25rem solid transparent;
  border-top: 0.35rem solid rgba(15, 76, 92, 0.35);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.arch-box.is-inactive {
  opacity: 0.16;
  filter: grayscale(85%);
  transform: scale(0.97);
  box-shadow: none;
  border-color: rgba(16, 32, 43, 0.06);
}

.arch-arrow.is-inactive {
  opacity: 0.12;
}

@media (max-width: 900px) {
  .arch-layer-top {
    grid-template-columns: 1fr;
  }

  .arch-arrows {
    gap: 0;
  }
}
</style>