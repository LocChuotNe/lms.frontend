import { useFetch } from '#app'

export const login = async (payload: any) => {
 return useFetch('http://127.0.0.1:8000/api/auth/login', {
    method: 'POST',
    body: payload,
    server: false, // nếu chỉ muốn gọi ở client
    headers: {
      'Content-Type': 'application/json'
    }
  })
}