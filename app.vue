<script setup lang="ts">
  import { onMounted } from 'vue'
  onMounted(() => {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
        window.location.reload()
      }
    })
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
