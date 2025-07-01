import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { login as fetchLogin } from '@/services/authService'

export const useAuth = () => {
  const formData = ref({
    email: '',
    password: '',
    remember: false
  })

  const isLoading = ref(false)
  const error = ref('')
  const router = useRouter()

  const login = async () => {
    isLoading.value = true
    error.value = ''

    try {
      const { data, error: fetchError } = await fetchLogin({
        email: formData.value.email,
        password: formData.value.password,
        remember_me: formData.value.remember
      })

      if (fetchError.value) throw fetchError.value

      const { user, token } = data.value.data

      const cookieAge = formData.value.remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24

      useCookie('auth_token', { maxAge: cookieAge }).value = token
      useCookie('auth_user', { maxAge: cookieAge }).value = user

      router.push(user.role === 'admin' ? '/admin/dashboard' : '/')
    } catch (err: any) {
      console.error('Login error:', err)
      const status = err?.status
      const messageMap: Record<number, string> = {
        401: 'Email hoặc mật khẩu không đúng!',
        422: 'Thông tin đăng nhập không hợp lệ!',
        500: 'Lỗi máy chủ. Vui lòng thử lại sau!'
      }

      error.value = messageMap[status] || err?.data?.message || 'Đăng nhập thất bại!'
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    useCookie('auth_token').value = null
    useCookie('auth_user').value = null
    await router.push('/auth/signin') // hoặc route login của bạn
  }

  return {
    formData,
    error,
    isLoading,
    login,
    logout
  }
}