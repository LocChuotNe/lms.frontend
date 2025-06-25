<script setup lang="ts">
    import { ref } from 'vue'

    const collapsed = ref(false)
    const selectedContent = ref('dashboard') 
    const handleMenuClick = (key: string) => {
    selectedContent.value = key
    }
</script>

<template v-if="selectedContent === 'signin'">
    <AdminAuthSignup />
</template>