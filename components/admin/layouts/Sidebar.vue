<script setup lang="ts">
import {
    TeamOutlined,
    AppstoreOutlined,
    BulbOutlined
} from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
const props = defineProps<{
    collapsed: boolean
    selectedContent: string
    onMenuClick: (key: string) => void
}>()
const selectedKeys = ref<string[]>([props.selectedContent])
const handleMenuClick = (key: string) => {
    selectedKeys.value = [key]
    props.onMenuClick(key)
}
watch(
    () => props.selectedContent,
    (newkey) => {
        selectedKeys.value = [newkey]
    }
)
</script>

<template>
    <a-layout-sider 
        :collapsed="collapsed"
        :trigger="null"
        collapsible
    >
    <div class="logo" />
        <a-menu 
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :inline-collapsed="collapsed"
        >
            <a-menu-item
                key="dashboard"
                @click="handleMenuClick('dashboard')"
                class="custom-menu-item"
            >
                <appstore-outlined class="custom-icon" />
                <span class="font-medium">Dashboard</span>
            </a-menu-item>
            <a-sub-menu key="profile" class="custom-menu-item">
                <template #title>
                    <TeamOutlined class="custom-icon" />
                    <span class="font-medium">Profile</span>
                </template>

                <a-menu-item key="user-student" @click="handleMenuClick('user-student')">
                    Quản lý học viên
                </a-menu-item>
                <a-menu-item key="user-instructors" @click="handleMenuClick('user-instructors')">
                    Quản lý giảng viên
                </a-menu-item>
                <a-menu-item key="profile-security" @click="handleMenuClick('profile-security')">
                    Security Settings
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="learning" class="custom-menu-item">
                <template #title>
                    <BulbOutlined class="custom-icon" />
                    <span class="font-medium">Learning</span>
                </template>

                <a-menu-item key="learning-view" @click="handleMenuClick('learning-view')">
                    View Learning
                </a-menu-item>
                <a-menu-item key="learning-edit" @click="handleMenuClick('learning-edit')">
                    Edit Learning
                </a-menu-item>
                <a-menu-item key="learning-security" @click="handleMenuClick('learning-security')">
                    Security Settings
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<style scoped>
.custom-menu-item>*{
    display: flex;
    justify-items: center;
}
.custom-icon>*{
    font-size: 20px;
    display: flex;
}
:deep(.ant-menu-title-content){
    display: flex;
    align-items: center;
}
</style>