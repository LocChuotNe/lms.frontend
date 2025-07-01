<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import { useCookie } from '#app'
import { useRouter } from 'vue-router'
import AdminUserStudent from '~/components/admin/user/UserStudent.vue'
import AdminUserInstructors from '~/components/admin/user/UserInstructors.vue'

const collapsed = ref(false)
const selectedContent = ref('dashboard') 
const handleMenuClick = (key: string) => {
  selectedContent.value = key
}
const token = useCookie('auth_token')
const router = useRouter()

onMounted(() => {
  if (!token.value) {
    router.push('/auth/signin')
  }
})
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
          <AdminUserStudent />
        </template>
        <template v-else-if="selectedContent === 'user-instructors'">
          <AdminUserInstructors />
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>