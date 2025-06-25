<script setup lang="ts">
  import { ref, computed, defineComponent  } from 'vue'

  const search = ref('')
  const collapsed = defineModel<boolean>('collapsed', { required: true })
  const toggle = () => (collapsed.value = !collapsed.value)

  const iconClass = computed(() => 'text-gray-500 text-lg cursor-pointer')
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  const router = useRouter()

  const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/auth/signin')
      return
    }

    await axios.post('/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    localStorage.removeItem('token')
    router.push('/auth/signin')
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error)
    localStorage.removeItem('token')
    router.replace('/auth/signin')
  }
}
</script>


<template>
  <a-layout-header class="bg-white px-4 shadow-sm h-16 flex items-center justify-between">
    <div class="flex items-center gap-4 w-full lg:w-1/2">
      <align-left-outlined
        class="trigger md:hidden text-gray-500"
        @click="toggle"
      />
      <div class="md:flex items-center w-full max-w-md">
        <a-input
          v-model:value="search"
          placeholder="Search or type command..."
          allow-clear
          class="search-input w-full"
        >
          <template #suffix>
            <span class="text-xs text-gray-400">⌘ K</span>
          </template>
        </a-input>
      </div>
    </div>

    <div class="flex items-center gap-4 w-full justify-end">
        <a-popover placement="bottomRight" trigger="click">
            <template #content>
                <a-list
                    item-layout="horizontal"
                    :data-source="notifications"
                    class="w-80"
                >   
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
                <BellOutlined class="text-lg cursor-pointer cursor-pointer-custom" />
            </a-badge>
        </a-popover>
        <div class="relative">
            <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="flex items-center gap-2 cursor-pointer">
                      <img src="assets/images/user/owner.jpg" 
                          alt=""
                          class="w-10 h-10 rounded-full object-cover"
                      >
                      <p class="text-sm text-gray-900 font-medium leading-none m-0">Musharof</p>
                      <DownOutlined class="text-gray-400" />
                  </div>
                </a>
                <template #overlay>
                    <div class="bg-white border-gray-500 border-dashed drop-shadow-md w-64 p-3 space-y-2 mt-3 rounded-xl">
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
                                <span class="text-[#667085] font-medium">Support"</span>
                            </a-menu-item>
                            <a-menu-item key="signin" class="custom-menu-item" @click="handleLogout">
                              <LogoutOutlined class="text-gray-400 inline-flex mr-2 text-lg" />
                              <span class="text-red-500 font-medium">Sign Out</span>
                            </a-menu-item>
                        </a-menu>
                    </div>
                </template>
            </a-dropdown>
        </div>
    </div>
  </a-layout-header>
</template>

<style scoped>
.ant-layout-header {
  background: #fff;
}

.trigger {
  font-size: 18px;
  padding: 12px 12px;
  cursor: pointer;
  border: 1px solid #667085;
  color: #667085 !important;
  border-radius: 10px;
  transition: color 0.3s;
}

svg {
  width: 1.125rem;
  height: 1.125rem;
}
.cursor-pointer-custom{
    border-radius: 100%;
    padding: 10px;
    border: 1px solid #667085;
    color: #667085;
}
.custom-a-menu{
    box-shadow: none !important;
    border: none;
    color: #344054;
    padding: 0;
}
.custom-a-menu>*{
    padding: 8px 12px !important;
}
.custom-menu-item>*{
    align-items: center;
}
</style>