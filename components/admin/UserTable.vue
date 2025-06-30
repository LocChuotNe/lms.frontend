
<script setup lang="ts">
  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'Admin' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'Giảng viên' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'Học viên' }
  ]
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Tên</th>
        <th>Email</th>
        <th>Vai trò</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
      </tr>
    </tbody>
  </table>
</template>