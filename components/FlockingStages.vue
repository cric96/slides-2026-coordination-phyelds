<script setup lang="ts">
// Displays 4 real simulation frames representing the evolution of flocking
</script>

<template>
  <div class="flocking-shell">
    <div class="flocking-card">
      <div class="flocking-title">(Chaos)</div>
      <div class="flocking-img-container">
        <img src="/vmas-frame-0001.png" class="flocking-img" alt="Frame 1: Initial chaotic state" />
      </div>
    </div>
    <div class="flocking-card">
      <div class="flocking-title">(Early Coordination)</div>
      <div class="flocking-img-container">
        <img src="/vmas-frame-0021.png" class="flocking-img" alt="Frame 21: Early alignment" />
      </div>
    </div>
    <div class="flocking-card">
      <div class="flocking-title">(Cohesion)</div>
      <div class="flocking-img-container">
        <img src="/vmas-frame-0157.png" class="flocking-img" alt="Frame 157: Cohesive clusters" />
      </div>
    </div>
    <div class="flocking-card">
      <div class="flocking-title">(Aligned)</div>
      <div class="flocking-img-container">
        <img src="/vmas-frame-0885.png" class="flocking-img" alt="Frame 885: Fully converged flocking" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flocking-shell {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;
  max-width: 46rem;
  margin: 0 auto;
}

.flocking-card {
  padding: 0.55rem;
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(16, 32, 43, 0.08);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.flocking-card:hover {
  border-color: rgba(15, 76, 92, 0.2);
  box-shadow: 0 16px 32px rgba(15, 76, 92, 0.08);
}

.flocking-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.64rem;
  color: #52616d;
  margin-bottom: 0.45rem;
  font-weight: 600;
  text-align: center;
}

.flocking-img-container {
  aspect-ratio: 1;
  background: #ffffff;
  border-radius: 0.6rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(16, 32, 43, 0.05);
}

.flocking-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.flocking-card:hover .flocking-img {
  transform: scale(1.05);
}
</style>