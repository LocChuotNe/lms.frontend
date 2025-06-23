<template>
  <div>
    <LayoutAppsidebar />
    <h1>Cập nhật người dùng</h1>
    <form @submit.prevent="submit">
      <input v-model="name" />
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script setup>
const route = useRoute()
const name = ref('')

onMounted(() => {
  const userId = route.params.id
  name.value = `Tên người dùng #${userId}`
})

const submit = () => {
  console.log('Cập nhật người dùng:', route.params.id, name.value)
}
</script>