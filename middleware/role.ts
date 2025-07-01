export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie('auth_user').value
  if (!user?.role) return navigateTo('/auth/signin')

  const requiredRoles = (to.meta?.roles || []) as string[]

  if (requiredRoles.length && !requiredRoles.includes(user.role)) {
    return navigateTo('/403') // trang bị từ chối truy cập
  }
})