<script setup lang="ts">
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
definePageMeta({
  layout: 'auth'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const agreeToTerms = ref(false)

const router = useRouter()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  if (password.value !== password_confirmation.value) {
    alert('Mật khẩu và xác nhận không khớp!');
    return;
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      phone: phone.value,
    });
    if (response.status === 200) {
      alert('Tạo tài khoản thành công.');
      router.push('/auth/signin')
    }
  } catch (error) {
    if (error.response) {
      alert('Error: ' + error.response.data.message);
    } else {
      alert('Error: Không thể liên lạc với máy chủ');
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
      <div class="flex justify-center mb-4">
        <img src="" alt="Logo" class="w-12 h-12">
      </div>

      <h2 class="text-3xl font-bold text-center text-gray-800 mb-2">Create your account</h2>
      <p class="text-sm text-center text-gray-500 mb-6">Join us and start learning today</p>

      <div class="flex gap-2 mb-4">
        <button type="button" class="w-full py-2 border rounded-md hover:bg-gray-50">
          <span class="text-sm">Sign up with Google</span>
        </button>
        <button type="button" class="w-full py-2 border rounded-md hover:bg-gray-50">
          <span class="text-sm">Sign up with GitHub</span>
        </button>
      </div>

      <div class="flex items-center my-5">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="mx-3 text-xs text-gray-400">OR</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="text-sm font-medium text-gray-700">Full Name</label>
          <input v-model="name" id="name" type="text" placeholder="Full Name"
            class="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label for="phone" class="text-sm font-medium text-gray-700">Phone Number</label>
          <input v-model="phone" id="phone" type="tel" placeholder="Phone Number"
            class="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label for="email" class="text-sm font-medium text-gray-700">Email Address</label>
          <input v-model="email" id="email" type="email" placeholder="you@example.com"
            class="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute right-3 top-3 text-gray-400 hover:text-blue-600"
          >
            <component :is="showPassword ? EyeInvisibleOutlined : EyeOutlined" class="text-xl" />
          </button>
        </div>
        <div>
          <label for="password_confirmation" class="text-sm font-medium text-gray-700">Confirm Password</label>
          <input v-model="password_confirmation" id="password_confirmation" type="password"
            class="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="flex items-start gap-2 text-sm text-gray-700">
          <input v-model="agreeToTerms" id="agreeToTerms" type="checkbox" class="mt-1">
          <label for="agreeToTerms">
            I agree to the <a href="/terms" class="text-blue-500 hover:underline">Terms and Conditions</a>
          </label>
        </div>
        <button type="submit"
          class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Sign Up
        </button>
        <p class="text-center text-sm text-gray-500 mt-4">
          Already have an account?
          <a @click.prevent="router.push('/auth/signin')" class="text-blue-500 font-medium hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  </div>
</template>