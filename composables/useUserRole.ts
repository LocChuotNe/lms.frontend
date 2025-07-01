export const useUserRole = () => {
  const user = useCookie('auth_user')

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isTeacher = computed(() => user.value?.role === 'teacher')
  const isStudent = computed(() => user.value?.role === 'student')
  const canAccess = (roles: string[]) => roles.includes(user.value?.role)

  return { isAdmin, isTeacher, isStudent, canAccess }
}