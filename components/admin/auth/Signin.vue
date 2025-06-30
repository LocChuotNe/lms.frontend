<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { EyeOutlined, EyeInvisibleOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons-vue'

const { formData, errorMessage, isLoading, login } = useAuth()
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  await login()
}
</script>
<template>
  <FullScreenLayout>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4 dark:bg-gray-900">
      <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 mb-6"
        >
          <svg class="mr-2" width="20" height="20" fill="none" stroke="currentColor">
            <path
              d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back to dashboard
        </NuxtLink>

        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-1">
          Welcome Back
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Enter your email and password to sign in
        </p>
        <div
          v-if="errorMessage"
          class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
        >
          {{ errorMessage }}
        </div>
        <div class="flex gap-3 mb-4">
          <a-button 
            class="w-full flex items-center !font-bold !text-red-600 !border-red-600 hover:!bg-red-600 hover:!text-white" 
            block 
            @click="signInWith('google')"
          >
            <GoogleOutlined />
            <span>Sign in with Google</span>
          </a-button>
          <a-button 
            class="w-full flex items-center !font-bold !text-black-600 !border-[#000]-500 hover:!bg-blue-600 hover:!text-white hover:!border-blue-600" 
            block 
            @click="signInWith('github')"
          >
            <GithubOutlined />
            <span>Sign in with GitHub</span>
          </a-button>
        </div>
        <div class="flex items-center my-4">
          <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          <span class="mx-2 text-xs text-gray-400 dark:text-gray-500">OR</span>
          <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <a-form
          @submit.prevent="handleSubmit"
          :model="formData"
          :layout="'vertical'"
          class="space-y-5"
        >
          <a-form-item
            label="Email address"
            name="email"
            :rules="[{ required: true, message: 'Please enter your email' }]"
          >
            <a-input
              v-model:value="formData.email"
              type="email"
              placeholder="you@example.com"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please enter your password' }]"
          >
            <a-input-password
              v-model:value="formData.password"
              placeholder="Enter your password"
              :iconRender="visible => visible ? h(EyeInvisibleOutlined) : h(EyeOutlined)"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="isLoading"
              block
            >
              {{ isLoading ? 'Signing In...' : 'Sign In' }}
            </a-button>
          </a-form-item>
        </a-form>
        <p class="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-blue-600 font-medium hover:underline dark:text-blue-400" >
            Sign Up
          </NuxtLink>
        </p>
      </div>
    </div>
  </FullScreenLayout>
</template>