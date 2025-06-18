<script setup lang="ts">
  import UserTable from '~/components/admin/UserTable.vue'
</script>

<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
    <UserTable />
  </div>
</template>