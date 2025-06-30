export type UserRole = 'admin' | 'teacher' | 'student'

export const STAFF_ROLES: UserRole[] = ['admin', 'teacher']
export const isAdmin = (role?: string) => role === 'admin'
export const isStaff = (role?: string) => STAFF_ROLES.includes(role as UserRole)