export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token') || localStorage.getItem('token')

  // Giả sử chỉ bảo vệ các route cần auth
  if (to.meta.requiresAuth && !token) {
    return navigateTo('/auth/signin')
  }
})
