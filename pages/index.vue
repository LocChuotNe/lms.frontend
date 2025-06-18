<template>
  <div>
    <h1 class="text-3xl font-bold text-blue-500">Dữ liệu API:</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const message = ref('Đang tải...');

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/test');
    console.log('API Response:', response.data);
    message.value = response.data.message;
  } catch (error) {
    console.error('API Error:', error);
    message.value = 'Lỗi kết nối API!';
  }
});
</script>