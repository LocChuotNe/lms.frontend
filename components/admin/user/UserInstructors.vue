<script setup lang="ts">
import { ref, computed } from 'vue'

interface Instructor {
  id: string
  name: string
  email: string
  specialty: string
  degree: string
  experience: string
  avatar: string
  classes: string[]
  status: 'Active' | 'Inactive' | 'On_Leave' | 'Terminated'
  phone: string
  joinDate: string
  instructorCode: string
}

interface Props {
  title?: string
  className?: string
  desc?: string
}

const props = defineProps<Props>()

const searchQuery = ref('')
const selectedStatus = ref('all')
const selectedSpecialty = ref('all')

const instructors = ref<Instructor[]>([
  {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@edu.vn',
    specialty: 'Lập trình Web',
    degree: 'Thạc sĩ Công nghệ thông tin',
    experience: '5 năm',
    avatar: '/images/instructor/instructor-1.jpg',
    classes: ['ReactJS Nâng cao', 'JavaScript Cơ bản', 'NodeJS Backend'],
    status: 'Active',
    phone: '0901234567',
    joinDate: '2020-03-15',
    instructorCode: 'GV001',
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'tranthibinh@edu.vn',
    specialty: 'Thiết kế UI/UX',
    degree: 'Cử nhân Mỹ thuật ứng dụng',
    experience: '3 năm',
    avatar: '/images/instructor/instructor-2.jpg',
    classes: ['Figma Professional', 'Adobe XD Cơ bản'],
    status: 'Active',
    phone: '0907654321',
    joinDate: '2021-06-20',
    instructorCode: 'GV002',
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    email: 'lehoangcuong@edu.vn',
    specialty: 'Lập trình Mobile',
    degree: 'Kỹ sư Phần mềm',
    experience: '7 năm',
    avatar: '/images/instructor/instructor-3.jpg',
    classes: ['React Native', 'Flutter Development'],
    status: 'Active',
    phone: '0912345678',
    joinDate: '2019-01-10',
    instructorCode: 'GV003',
  },
  {
    id: '4',
    name: 'Phạm Minh Đức',
    email: 'phamminhduc@edu.vn',
    specialty: 'Data Science',
    degree: 'Tiến sĩ Khoa học máy tính',
    experience: '10 năm',
    avatar: '/images/instructor/instructor-4.jpg',
    classes: ['Python Data Science', 'Machine Learning'],
    status: 'On_Leave',
    phone: '0923456789',
    joinDate: '2018-09-05',
    instructorCode: 'GV004',
  },
  {
    id: '5',
    name: 'Võ Thị Hoa',
    email: 'vothihoa@edu.vn',
    specialty: 'Digital Marketing',
    degree: 'Thạc sĩ Marketing',
    experience: '4 năm',
    avatar: '/images/instructor/instructor-5.jpg',
    classes: ['SEO/SEM', 'Social Media Marketing'],
    status: 'Inactive',
    phone: '0934567890',
    joinDate: '2020-11-12',
    instructorCode: 'GV005',
  },
  {
    id: '6',
    name: 'Đỗ Văn Thành',
    email: 'dovanthanh@edu.vn',
    specialty: 'DevOps',
    degree: 'Kỹ sư Hệ thống',
    experience: '6 năm',
    avatar: '/images/instructor/instructor-6.jpg',
    classes: ['Docker & Kubernetes', 'AWS Cloud'],
    status: 'Active',
    phone: '0945678901',
    joinDate: '2019-08-25',
    instructorCode: 'GV006',
  },
])

const specialties = computed(() => {
  const uniqueSpecialties = [...new Set(instructors.value.map(i => i.specialty))]
  return uniqueSpecialties
})

const filteredInstructors = computed(() => {
  return instructors.value.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         instructor.specialty.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'all' || instructor.status === selectedStatus.value
    const matchesSpecialty = selectedSpecialty.value === 'all' || instructor.specialty === selectedSpecialty.value
    
    return matchesSearch && matchesStatus && matchesSpecialty
  })
})

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-500'
    case 'Inactive':
      return 'bg-gray-50 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
    case 'On_Leave':
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400'
    case 'Terminated':
      return 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-500'
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'Active':
      return 'Đang hoạt động'
    case 'Inactive':
      return 'Tạm ngưng'
    case 'On_Leave':
      return 'Nghỉ phép'
    case 'Terminated':
      return 'Đã nghỉ việc'
    default:
      return status
  }
}

const assignToClass = (instructorId: string) => {
  console.log('Gán giảng viên vào lớp:', instructorId)
}

const toggleStatus = (instructorId: string) => {
  const instructor = instructors.value.find(i => i.id === instructorId)
  if (instructor) {
    instructor.status = instructor.status === 'Active' ? 'Inactive' : 'Active'
  }
}

const deleteInstructor = (instructorId: string) => {
  if (confirm('Bạn có chắc chắn muốn xóa giảng viên này?')) {
    const index = instructors.value.findIndex(i => i.id === instructorId)
    if (index > -1) {
      instructors.value.splice(index, 1)
    }
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
        <!-- Card Header -->
        <div class="px-6 py-5">
        <div class="flex items-center justify-between">
            <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                {{ title || 'Danh sách giảng viên' }}
            </h3>
            <p v-if="desc" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ desc || 'Quản lý thông tin và lịch dạy của giảng viên' }}
            </p>
            </div>
            <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative">
                <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm giảng viên..."
                class="w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
            </div>
            
            <!-- Status Filter -->
            <select 
                v-model="selectedStatus"
                class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="all">Tất cả trạng thái</option>
                <option value="Active">Đang hoạt động</option>
                <option value="Inactive">Tạm ngưng</option>
                <option value="On_Leave">Nghỉ phép</option>
                <option value="Terminated">Đã nghỉ việc</option>
            </select>

            <!-- Specialty Filter -->
            <select 
                v-model="selectedSpecialty"
                class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="all">Tất cả chuyên môn</option>
                <option v-for="specialty in specialties" :key="specialty" :value="specialty">
                    {{ specialty }}
                </option>
            </select>

            <!-- Add button -->
            <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm giảng viên
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
                        Giảng viên
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Chuyên môn & Bằng cấp
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Lớp đang dạy
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Trạng thái
                    </span>
                    </th>
                    <th class="px-6 py-4 text-left">
                    <span class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Mã giảng viên
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
                    v-for="instructor in filteredInstructors"
                    :key="instructor.id"
                    class="hover:bg-gray-50/50 dark:hover:bg-gray-800/25 transition-colors duration-150 ease-in-out"
                >
                    <!-- Instructor Info -->
                    <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-11 w-11">
                        <div class="h-11 w-11 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                            <span class="text-sm font-semibold text-white">
                            {{ instructor.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() }}
                            </span>
                        </div>
                        </div>
                        <div class="ml-4">
                        <div class="text-sm font-semibold text-gray-900 dark:text-white">
                            {{ instructor.name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ instructor.email }}
                        </div>
                        <div class="text-xs text-gray-400 dark:text-gray-500">
                            Kinh nghiệm: {{ instructor.experience }}
                        </div>
                        </div>
                    </div>
                    </td>

                    <!-- Specialty & Degree -->
                    <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ instructor.specialty }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ instructor.degree }}
                    </div>
                    </td>

                    <!-- Classes -->
                    <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                        <span
                        v-for="(className, index) in instructor.classes.slice(0, 2)"
                        :key="index"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                        {{ className }}
                        </span>
                        <span
                        v-if="instructor.classes.length > 2"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        >
                        +{{ instructor.classes.length - 2 }} khác
                        </span>
                    </div>
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                    <span
                        :class="[
                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                        getStatusClass(instructor.status)
                        ]"
                    >
                        <svg class="w-1.5 h-1.5 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                        </svg>
                        {{ getStatusText(instructor.status) }}
                    </span>
                    </td>

                    <!-- Instructor Code -->
                    <td class="px-6 py-4">
                        <div class="text-sm font-mono text-gray-900 dark:text-white">
                            {{ instructor.instructorCode }}
                        </div>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end space-x-2">
                            <!-- View Details -->
                            <button 
                                class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 dark:hover:text-blue-400 dark:hover:bg-blue-500/10"
                                title="Xem chi tiết"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            </button>

                            <!-- Edit -->
                            <button 
                                class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150 dark:hover:text-green-400 dark:hover:bg-green-500/10"
                                title="Chỉnh sửa thông tin"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            </button>

                            <!-- Assign to Class -->
                            <button 
                                @click="assignToClass(instructor.id)"
                                class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-150 dark:hover:text-purple-400 dark:hover:bg-purple-500/10"
                                title="Gán vào lớp"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            </button>

                            <!-- Toggle Status -->
                            <button 
                                @click="toggleStatus(instructor.id)"
                                class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-150 dark:hover:text-orange-400 dark:hover:bg-orange-500/10"
                                title="Thay đổi trạng thái"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                            </button>

                            <!-- Delete -->
                            <button 
                                @click="deleteInstructor(instructor.id)"
                                class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 dark:hover:text-red-400 dark:hover:bg-red-500/10"
                                title="Xóa giảng viên"
                            >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                Hiển thị {{ filteredInstructors.length }} trong {{ instructors.length }} giảng viên
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