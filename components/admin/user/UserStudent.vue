<script setup lang="ts">
import { ref } from 'vue'

interface Student {
  id: string
  name: string
  role: string
  avatar: string
  project: string
  team: string[]
  status: 'Active' | 'Pending' | 'Cancel' | 'Graduated'
  budget: string
}

interface Props {
  title?: string
  className?: string
  desc?: string
}

const props = defineProps<Props>()

const students = ref<Student[]>([
  {
    id: '1',
    name: 'Nguyễn Văn An',
    role: 'Học viên Frontend',
    avatar: '/images/user/user-17.jpg',
    project: 'React Development',
    team: ['/images/user/user-22.jpg', '/images/user/user-23.jpg', '/images/user/user-24.jpg'],
    status: 'Active',
    budget: 'SV001',
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    role: 'Học viên Backend',
    avatar: '/images/user/user-18.jpg',
    project: 'Node.js Fundamentals',
    team: ['/images/user/user-25.jpg', '/images/user/user-26.jpg'],
    status: 'Pending',
    budget: 'SV002',
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    role: 'Học viên Fullstack',
    avatar: '/images/user/user-19.jpg',
    project: 'MERN Stack',
    team: ['/images/user/user-27.jpg'],
    status: 'Active',
    budget: 'SV003',
  },
  {
    id: '4',
    name: 'Phạm Minh Đức',
    role: 'Học viên Mobile',
    avatar: '/images/user/user-20.jpg',
    project: 'React Native',
    team: ['/images/user/user-28.jpg', '/images/user/user-29.jpg', '/images/user/user-30.jpg'],
    status: 'Cancel',
    budget: 'SV004',
  },
  {
    id: '5',
    name: 'Võ Thị Hoa',
    role: 'Học viên UI/UX',
    avatar: '/images/user/user-21.jpg',
    project: 'Design System',
    team: ['/images/user/user-31.jpg', '/images/user/user-32.jpg', '/images/user/user-33.jpg'],
    status: 'Graduated',
    budget: 'SV005',
  },
  {
    id: '6',
    name: 'Đỗ Văn Thành',
    role: 'Học viên DevOps',
    avatar: '/images/user/user-17.jpg',
    project: 'Cloud Infrastructure',
    team: ['/images/user/user-22.jpg', '/images/user/user-23.jpg'],
    status: 'Active',
    budget: 'SV006',
  },
])

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-500'
    case 'Pending':
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400'
    case 'Cancel':
      return 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-500'
    case 'Graduated':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-500'
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'Active':
      return 'Đang học'
    case 'Pending':
      return 'Tạm dừng'
    case 'Cancel':
      return 'Đã hủy'
    case 'Graduated':
      return 'Tốt nghiệp'
    default:
      return status
  }
}
</script>

<template>
    <div class="max-w-full p-4 md:p-6">
        <div
            :class="[
            'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]',
            className,
            ]"
        >
        <div class="px-6 py-5">
        <div class="flex items-center justify-between">
            <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                {{ title || 'Danh sách học viên' }}
            </h3>
            <p v-if="desc" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ desc }}
            </p>
            </div>
            <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative">
                <input
                type="text"
                placeholder="Tìm kiếm học viên..."
                class="w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
            </div>
            
            <!-- Filter dropdown -->
            <select class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option>Tất cả trạng thái</option>
                <option>Đang học</option>
                <option>Tạm dừng</option>
                <option>Tốt nghiệp</option>
                <option>Đã hủy</option>
            </select>

            <!-- Add button -->
            <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm học viên
            </button>
            </div>
        </div>
        </div>

        <!-- Card Body -->
        <div class="border-t border-gray-100 dark:border-gray-800">
        <div class="overflow-hidden rounded-b-2xl">
            <div class="max-w-full overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Học viên
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Khóa học
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Nhóm học tập
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Trạng thái
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Mã học viên
                    </span>
                    </th>
                    <th class="px-6 py-4 text-right">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Thao tác
                    </span>
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100 dark:bg-transparent dark:divide-gray-800">
                    <tr
                        v-for="student in students"
                        :key="student.id"
                        class="hover:bg-gray-50/50 dark:hover:bg-gray-800/25 transition-colors duration-150 ease-in-out"
                    >
                    <!-- Student Info -->
                    <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-11 w-11">
                        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <span class="text-sm font-semibold text-white">
                            {{ student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() }}
                            </span>
                        </div>
                        </div>
                        <div class="ml-4">
                        <div class="text-sm font-semibold text-gray-900 dark:text-white">
                            {{ student.name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ student.role }}
                        </div>
                        </div>
                    </div>
                    </td>

                    <!-- Project/Course -->
                    <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 dark:text-white">
                        {{ student.project }}
                    </div>
                    </td>

                    <!-- Team -->
                    <td class="px-6 py-4">
                    <div class="flex -space-x-2">
                        <div
                        v-for="(member, index) in student.team.slice(0, 3)"
                        :key="index"
                        class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                        >
                        <div class="h-8 w-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                            <span class="text-xs font-medium text-white">
                            {{ String.fromCharCode(65 + index) }}
                            </span>
                        </div>
                        </div>
                        <div
                        v-if="student.team.length > 3"
                        class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white text-xs font-medium text-gray-500 dark:bg-gray-700 dark:ring-gray-800 dark:text-gray-400"
                        >
                        +{{ student.team.length - 3 }}
                        </div>
                    </div>
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                    <span
                        :class="[
                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                        getStatusClass(student.status)
                        ]"
                    >
                        <svg class="w-1.5 h-1.5 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                        </svg>
                        {{ getStatusText(student.status) }}
                    </span>
                    </td>

                    <!-- Student Code -->
                    <td class="px-6 py-4">
                        <div class="text-sm font-mono text-gray-900 dark:text-white">
                            {{ student.budget }}
                        </div>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end space-x-2">
                            <!-- View Details -->
                            <button class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 dark:hover:text-blue-400 dark:hover:bg-blue-500/10">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            </button>

                            <!-- Edit -->
                            <button class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150 dark:hover:text-green-400 dark:hover:bg-green-500/10">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            </button>

                            <!-- More Options -->
                            <button class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-150 dark:hover:text-gray-300 dark:hover:bg-gray-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        <!-- Table Footer -->
        <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500 dark:text-gray-400">
                Hiển thị 1-{{ students.length }} trong {{ students.length }} học viên
            </div>
            <div class="flex items-center space-x-2">
                <button class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Trước
                </button>
                <span class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg">
                1
                </span>
                <button class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
                    Sau
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
/* Custom scrollbar for table */
.max-w-full::-webkit-scrollbar {
  height: 6px;
}

.max-w-full::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.max-w-full::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-w-full::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .max-w-full::-webkit-scrollbar-track {
  background: #374151;
}

.dark .max-w-full::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark .max-w-full::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>