<script setup lang="ts">
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email: email.value,
      password: password.value,
    })
    if (response.status === 200) {
      alert('Đăng nhập thành công!')
      router.push('/admin/dashboard')
    }
  } catch (error) {
    if (error.response) {
      alert('Error: ' + error.response.data.message)
    } else {
      alert('Error: Unable to contact the server.')
    }
  }
}
</script>

<template>
  <FullScreenLayout>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4 dark:bg-gray-900">
      <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <router-link to="/" class="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 mb-6">
          <svg class="mr-2" width="20" height="20" fill="none" stroke="currentColor">
            <path d="M12.7083 5L7.5 10.2083L12.7083 15.4167" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back to dashboard
        </router-link>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-1">Welcome Back</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Enter your email and password to sign in</p>
        <div class="flex gap-3 mb-4">
          <button class="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Sign in with Google
          </button>
          <button class="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Sign in with GitHub
          </button>
        </div>
        <div class="flex items-center my-4">
          <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          <span class="mx-2 text-xs text-gray-400 dark:text-gray-500">OR</span>
          <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email address</label>
            <input v-model="email" type="email" id="email" placeholder="you@example.com"
              class="w-full h-11 px-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-white/30 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Password</label>
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
          </div>
          <button type="submit"
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
            Sign In
          </button>
        </form>
        <p class="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
          Don’t have an account?
          <router-link to="/auth/register" class="text-blue-600 font-medium hover:underline dark:text-blue-400">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </FullScreenLayout>
</template>