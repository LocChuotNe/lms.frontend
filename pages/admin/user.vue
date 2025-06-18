<script setup lang="ts">
    import UserTable from '~/components/admin/UserTable.vue'

    definePageMeta({ layout: 'default' })
</script>

<template>
  <div>
    <h1>Quản lý người dùng</h1>
    <UserTable />
  </div>
</template>