<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import axios from 'axios'

import {
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
  BellOutlined
} from '@ant-design/icons-vue'

const search = ref('')
const collapsed = defineModel<boolean>('collapsed', { required: true })
const toggle = () => (collapsed.value = !collapsed.value)
const iconClass = computed(() => 'text-gray-500 text-lg cursor-pointer')

const { logout } = useAuth()
</script>

<template>
  <a-layout-header class="!bg-white px-4 shadow-sm h-16 flex items-center justify-between border-b-1">
    <div class="flex items-center gap-4 w-full lg:w-1/2">
      <align-left-outlined class="trigger md:hidden text-gray-500" @click="toggle" />
      <div class="md:flex items-center w-full max-w-md">
        <a-input v-model:value="search" placeholder="Search or type command..." allow-clear class="search-input w-full">
          <template #suffix>
            <span class="text-xs text-gray-400">⌘ K</span>
          </template>
        </a-input>
      </div>
    </div>

    <div class="flex items-center gap-4 w-full justify-end">
      <!-- Thông báo -->
      <a-popover placement="bottomRight" trigger="click">
        <template #content>
          <a-list item-layout="horizontal" :data-source="[]" class="w-80">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta
                  :avatar="h('a-avatar', { src: item.avatar })"
                  :title="item.title"
                  :description="item.description"
                />
                <div class="text-xs text-gray-400">{{ item.time }}</div>
              </a-list-item>
            </template>
          </a-list>
        </template>
        <a-badge count="3" dot>
          <BellOutlined class="text-lg cursor-pointer" />
        </a-badge>
      </a-popover>

      <!-- Avatar Dropdown -->
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <div class="flex items-center gap-2 cursor-pointer">
            <img
              src="/assets/images/user/owner.jpg"
              alt="Avatar"
              class="w-10 h-10 rounded-full object-cover"
            />
            <p class="text-sm text-gray-900 font-medium leading-none m-0">Musharof</p>
            <DownOutlined class="text-gray-400" />
          </div>
        </a>
        <template #overlay>
          <div
            class="bg-white border-gray-500 border-dashed drop-shadow-md w-64 p-3 space-y-2 mt-3 rounded-xl"
          >
            <div>
              <p class="text-sm font-semibold text-gray-900 mb-1">Musharof Chowdhury</p>
              <p class="text-xs text-gray-500">randomuser@pimjo.com</p>
            </div>
            <a-menu class="custom-a-menu">
              <a-menu-item key="1" class="custom-menu-item">
                <UserOutlined class="text-gray-400 inline-flex mr-2 text-lg" />
                <span class="text-[#667085] font-medium">Edit Profile</span>
              </a-menu-item>
              <a-menu-item key="2" class="custom-menu-item">
                <SettingOutlined class="text-gray-400 inline-flex mr-2 text-lg" />
                <span class="text-[#667085] font-medium">Account Settings</span>
              </a-menu-item>
              <a-menu-item key="3" class="custom-menu-item">
                <ExclamationCircleOutlined class="text-gray-400 inline-flex mr-2 text-lg" />
                <span class="text-[#667085] font-medium">Support</span>
              </a-menu-item>
              <a-menu-item key="signout" class="custom-menu-item" @click="logout">
                <LogoutOutlined class="text-gray-400 inline-flex mr-2 text-lg" />
                <span class="text-red-500 font-medium">Sign Out</span>
              </a-menu-item>
            </a-menu>
          </div>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>