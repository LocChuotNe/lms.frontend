<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-full p-4 md:p-6 grid gap-6">
        <div class="grid grid-cols-3 gap-6">
            <div class="grid gap-6 col-span-2">
              <div class="grid grid-cols-2 gap-6">
                <a-card class="shadow-sm border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <UserOutlined class="text-xl text-blue-600" />
                        </div>
                    </div>
                    <div class="mb-2">
                        <p class="text-gray-600 text-sm">Customers</p>
                        <h3 class="text-2xl font-bold text-gray-900">3,782</h3>
                    </div>
                    <div class="flex items-center text-green-600 text-sm">
                        <ArrowUpOutlined class="mr-1" />
                        <span>11.01%</span>
                    </div>
                </a-card>
                <a-card class="shadow-sm border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <ShoppingOutlined class="text-xl text-blue-600" />
                        </div>
                    </div>
                    <div class="mb-2">
                        <p class="text-gray-600 text-sm">Orders</p>
                        <h3 class="text-2xl font-bold text-gray-900">5,359</h3>
                    </div>
                    <div class="flex items-center text-red-600 text-sm">
                        <ArrowDownOutlined class="mr-1" />
                        <span>9.05%</span>
                    </div>
                </a-card>
              </div>
              <div class="">
                <a-card class="shadow-sm border-gray-100">
                    <template #extra>
                      <MoreOutlined class="text-gray-400" />
                    </template>
                    <template #title>
                      <span class="text-lg font-semibold">Monthly Sales</span>
                    </template>
                    <div class="h-64">
                      <canvas ref="monthlyChart"></canvas>
                    </div>
                </a-card>
              </div>
            </div>
            <div class="">
              <a-card class="shadow-sm border-gray-100">
                  <template #extra>
                      <MoreOutlined class="text-gray-400" />
                  </template>
                  <div class="mb-4">
                      <h3 class="text-lg font-semibold">Monthly Target</h3>
                      <p class="text-gray-600 text-sm">Target you've set for each month</p>
                  </div>
                  <div class="flex items-center justify-center mb-6">
                    <a-progress
                      type="circle"
                      :percent="75.55"
                      :width="120"
                      :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }"
                      >
                      <template #format="percent">
                          <div class="text-center">
                          <div class="text-xl font-bold">{{ percent }}%</div>
                          <div class="text-xs text-green-600">+10%</div>
                          </div>
                      </template>
                    </a-progress>
                  </div>
                  <div class="text-center mb-4">
                    <p class="text-sm text-gray-600">You earn $3287 today, it's higher than last month.</p>
                    <p class="text-sm text-gray-600">Keep up your good work!</p>
                  </div>
                  <a-row :gutter="16">
                    <a-col :span="8" class="text-center">
                      <p class="text-xs text-gray-500">Target</p>
                      <p class="text-sm font-semibold flex items-center justify-center">
                          $20K <ArrowDownOutlined class="ml-1 text-red-500 text-xs" />
                      </p>
                    </a-col>
                      <a-col :span="8" class="text-center">
                      <p class="text-xs text-gray-500">Revenue</p>
                      <p class="text-sm font-semibold flex items-center justify-center">
                          $20K <ArrowUpOutlined class="ml-1 text-green-500 text-xs" />
                      </p>
                    </a-col>
                    <a-col :span="8" class="text-center">
                      <p class="text-xs text-gray-500">Today</p>
                      <p class="text-sm font-semibold flex items-center justify-center">
                          $20K <ArrowUpOutlined class="ml-1 text-green-500 text-xs" />
                      </p>
                    </a-col>
                  </a-row>
                </a-card>
            </div>
        </div>
        <a-card class="shadow-sm border-gray-100">
        <template #title>
            <div>
            <h3 class="text-lg font-semibold">Statistics</h3>
            <p class="text-gray-600 text-sm">Target you've set for each month</p>
            </div>
        </template>
        <template #extra>
            <a-radio-group v-model:value="statisticsPeriod" button-style="solid" size="small">
            <a-radio-button value="monthly">Monthly</a-radio-button>
            <a-radio-button value="quarterly">Quarterly</a-radio-button>
            <a-radio-button value="annually">Annually</a-radio-button>
            </a-radio-group>
        </template>
        
        <div class="h-64">
            <canvas ref="statisticsChart"></canvas>
        </div>
      </a-card>
      <!-- Bottom Row -->
      <a-row :gutter="24">
        <!-- Customer Demographics -->
        <a-col :xs="24" :lg="12">
          <a-card class="shadow-sm border-gray-100">
            <template #title>
              <div>
                <h3 class="text-lg font-semibold">Customers Demographic</h3>
                <p class="text-gray-600 text-sm">Number of customer based on country</p>
              </div>
            </template>
            
            <!-- World Map Placeholder -->
            <div class="bg-gray-100 rounded-lg h-48 mb-6 flex items-center justify-center">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <GlobalOutlined class="text-2xl text-blue-600" />
                </div>
                <p class="text-gray-500 text-sm">World Map Visualization</p>
              </div>
            </div>

            <!-- Country Stats -->
            <div class="space-y-4">
              <div v-for="country in countries" :key="country.code" class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <a-avatar :size="32" :src="country.flag" />
                  <div>
                    <p class="font-medium">{{ country.name }}</p>
                    <p class="text-gray-500 text-sm">{{ country.customers }} Customers</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <a-progress
                    :percent="country.percentage"
                    :show-info="false"
                    :stroke-width="8"
                    class="w-24"
                  />
                  <span class="text-sm font-medium">{{ country.percentage }}%</span>
                </div>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- Recent Orders -->
        <a-col :xs="24" :lg="12">
          <a-card class="shadow-sm border-gray-100">
            <template #title>
              <span class="text-lg font-semibold">Recent Orders</span>
            </template>
            <template #extra>
              <div class="flex gap-2">
                <a-button size="small">
                  <template #icon>
                    <FilterOutlined />
                  </template>
                  Filter
                </a-button>
                <a-button type="link" size="small">See all</a-button>
              </div>
            </template>

            <a-table
              :dataSource="recentOrders"
              :columns="orderColumns"
              :pagination="false"
              size="small"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'product'">
                  <div class="flex items-center gap-3">
                    <a-avatar :size="32" shape="square" class="bg-gray-100">
                      {{ record.icon }}
                    </a-avatar>
                    <div>
                      <p class="font-medium text-sm">{{ record.product }}</p>
                      <p class="text-gray-500 text-xs">{{ record.variants }}</p>
                    </div>
                  </div>
                </template>
                <template v-else-if="column.key === 'status'">
                  <a-tag :color="getStatusColor(record.status)">
                    {{ record.status }}
                  </a-tag>
                </template>
                <template v-else-if="column.key === 'price'">
                  <span class="font-medium">{{ record.price }}</span>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import {
  UserOutlined,
  ShoppingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoreOutlined,
  GlobalOutlined,
  FilterOutlined
} from '@ant-design/icons-vue'

// Reactive data
const statisticsPeriod = ref('monthly')
const monthlyChart = ref(null)
const statisticsChart = ref(null)

// Sample data
const countries = ref([
  {
    code: 'US',
    name: 'USA',
    customers: '2,379',
    percentage: 79,
    flag: 'https://flagcdn.com/w40/us.png'
  },
  {
    code: 'FR',
    name: 'France',
    customers: '589',
    percentage: 23,
    flag: 'https://flagcdn.com/w40/fr.png'
  }
])

const recentOrders = ref([
  {
    key: '1',
    product: 'Macbook pro 13"',
    variants: '2 Variants',
    category: 'Laptop',
    price: '$2399.00',
    status: 'Delivered',
    icon: '💻'
  },
  {
    key: '2',
    product: 'Apple Watch Ultra',
    variants: '1 Variants',
    category: 'Watch',
    price: '$879.00',
    status: 'Pending',
    icon: '⌚'
  },
  {
    key: '3',
    product: 'iPhone 15 Pro Max',
    variants: '2 Variants',
    category: 'SmartPhone',
    price: '$1869.00',
    status: 'Delivered',
    icon: '📱'
  },
  {
    key: '4',
    product: 'iPad Pro 3rd Gen',
    variants: '2 Variants',
    category: 'Electronics',
    price: '$1699.00',
    status: 'Canceled',
    icon: '📟'
  },
  {
    key: '5',
    product: 'Airpods Pro 2nd Gen',
    variants: '1 Variants',
    category: 'Accessories',
    price: '$240.00',
    status: 'Delivered',
    icon: '🎧'
  }
])

const orderColumns = [
  {
    title: 'Products',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
]

// Chart data
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Sales',
    data: [150, 380, 200, 280, 180, 170, 280, 80, 200, 380, 260, 100],
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    borderSkipped: false,
  }]
}

const statisticsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'Upper',
      data: [180, 185, 175, 170, 185, 180, 175, 190, 195],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: '#3b82f6',
      fill: '+1'
    },
    {
      label: 'Lower',
      data: [45, 40, 50, 45, 55, 45, 50, 85, 105],
      backgroundColor: 'rgba(147, 197, 253, 0.6)',
      borderColor: '#93c5fd',
      fill: 'origin'
    }
  ]
}

// Methods
const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'green'
    case 'Pending':
      return 'orange'
    case 'Canceled':
      return 'red'
    default:
      return 'default'
  }
}

const initCharts = () => {
  // Monthly Sales Chart
  if (monthlyChart.value) {
    new Chart(monthlyChart.value, {
      type: 'bar',
      data: monthlyData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              color: '#f3f4f6'
            },
            beginAtZero: true
          }
        }
      }
    })
  }

  // Statistics Chart
  if (statisticsChart.value) {
    new Chart(statisticsChart.value, {
      type: 'line',
      data: statisticsData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              color: '#f3f4f6'
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          }
        }
      }
    })
  }
}

onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})
</script>

<style scoped>
:deep(.ant-card-head-title) {
  padding: 0;
}

:deep(.ant-progress-circle .ant-progress-text) {
  font-size: 14px;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
}

:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #f0f0f0;
}
</style>