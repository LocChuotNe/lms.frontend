<template>
  <div>
    <h1>Tạo người dùng mới</h1>
    <form @submit.prevent="submit">
      <input v-model="name" placeholder="Tên người dùng" />
      <button type="submit">Lưu</button>
    </form>
  </div>
</template>

<script setup>
const name = ref('')
const submit = () => {
  console.log('Tạo người dùng:', name.value)
  // Gửi API tạo user ở đây
}
</script>