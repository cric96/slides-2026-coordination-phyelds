<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  click?: number
}>()

const steps = [
  '00_overview',
  '01_state',
  '02_training',
  '03_similarity',
  '04_leaders',
  '05_potential',
  '06_aggregation',
  '07_sharing',
  '08_update',
  '09_together',
]

// import.meta.env.BASE_URL keeps the path valid when the deck is deployed
// under a sub-path (GitHub Pages builds with --base /<repo-name>/).
const src = computed(() => {
  const index = Math.min(Math.max(props.click ?? 0, 0), steps.length - 1)
  return `${import.meta.env.BASE_URL}federated-learning/${steps[index]}.png`
})
</script>

<template>
  <img :src="src" style="width: 100%; border-radius: 10px;" alt="Federated learning step visualization" />
</template>
