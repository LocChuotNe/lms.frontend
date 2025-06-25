<template>
  <div>
    <h1>Danh sách người dùng</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - <NuxtLink :to="`/admin/user/${user.id}`">Sửa</NuxtLink>
      </li>
    </ul>
    <NuxtLink to="/admin/user/create">➕ Thêm người dùng</NuxtLink>
  </div>
</template>

<script setup>
const users = ref([
  { id: 1, name: 'Nguyễn Văn A' },
  { id: 2, name: 'Trần Thị B' }
])
</script>