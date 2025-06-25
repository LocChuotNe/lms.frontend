<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const selectedContent = ref('dashboard') 
const handleMenuClick = (key: string) => {
  selectedContent.value = key
}
</script>

<template>
  <a-layout>
    <AdminLayoutsSidebar 
      :collapsed="collapsed"
      :selectedContent="selectedContent"
      :onMenuClick="handleMenuClick"
    />
    <a-layout>
      <AdminLayoutsHeader v-model:collapsed="collapsed" />
      <a-layout-content>
        <template v-if="selectedContent === 'dashboard'">
          <AdminDashboardOverview />
        </template>
        <template v-else-if="selectedContent === 'user-student'">
          <AdminUserUserStudent />
        </template>
        <template v-else-if="selectedContent === 'user-instructors'">
          <AdminUserUserInstructors />
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>