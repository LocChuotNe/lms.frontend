<template>
  <a-layout>
    <Sidebar />
    <a-layout class="min-h-screen">
      <AppHeader />
      <a-layout-content class="p-6 bg-gray-50">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>