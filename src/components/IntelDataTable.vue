<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :data-source="displayData"
      :scroll="{ y: 'calc(100vh - 300px)' }"
      :pagination="false"
    >
      <!-- <template #title>遥感情报信息列表</template> -->
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { type IntelData } from '@/types'

const allData: IntelData[] = [
  {
    id: '001',
    content: '情报内容',
    imageUrl: '情报图片地址',
    createdAt: '2021-04-01 13:01:01',
    satelliteId: 'A11111',
    lnglat: '124 34',
  },
  {
    id: '002',
    content: '发现可疑目标移动',
    imageUrl: 'https://example.com/intel/002.jpg',
    createdAt: '2021-04-01 14:22:33',
    satelliteId: 'B22222',
    lnglat: '126 35',
  },
  {
    id: '003',
    content: '区域异常活动迹象',
    imageUrl: 'https://example.com/intel/003.jpg',
    createdAt: '2021-04-01 15:45:12',
    satelliteId: 'C33333',
    lnglat: '122 32',
  },
  {
    id: '004',
    content: '检测到地面设施变化',
    imageUrl: 'https://example.com/intel/004.jpg',
    createdAt: '2021-04-01 16:30:45',
    satelliteId: 'D44444',
    lnglat: '128 36',
  },
  {
    id: '005',
    content: '发现新建筑物',
    imageUrl: 'https://example.com/intel/005.jpg',
    createdAt: '2021-04-01 17:15:22',
    satelliteId: 'E55555',
    lnglat: '125 33',
  },
  {
    id: '006',
    content: '监测到区域通信信号',
    imageUrl: 'https://example.com/intel/006.jpg',
    createdAt: '2021-04-01 18:05:55',
    satelliteId: 'F66666',
    lnglat: '127 37',
  },
  {
    id: '007',
    content: '发现大规模车辆移动',
    imageUrl: 'https://example.com/intel/007.jpg',
    createdAt: '2021-04-01 19:12:33',
    satelliteId: 'G77777',
    lnglat: '123 35',
  },
  {
    id: '008',
    content: '检测到雷达信号活动',
    imageUrl: 'https://example.com/intel/008.jpg',
    createdAt: '2021-04-01 20:25:44',
    satelliteId: 'H88888',
    lnglat: '125 36',
  },
  {
    id: '009',
    content: '发现新建军事设施',
    imageUrl: 'https://example.com/intel/009.jpg',
    createdAt: '2021-04-01 21:33:21',
    satelliteId: 'I99999',
    lnglat: '126 33',
  },
  {
    id: '010',
    content: '监测到大型装备调动',
    imageUrl: 'https://example.com/intel/010.jpg',
    createdAt: '2021-04-01 22:45:11',
    satelliteId: 'J10101',
    lnglat: '124 37',
  },
  {
    id: '011',
    content: '发现可疑地下设施',
    imageUrl: 'https://example.com/intel/011.jpg',
    createdAt: '2021-04-01 23:15:42',
    satelliteId: 'K11111',
    lnglat: '127 34',
  },
  {
    id: '012',
    content: '检测到异常能量信号',
    imageUrl: 'https://example.com/intel/012.jpg',
    createdAt: '2021-04-02 00:22:33',
    satelliteId: 'L12121',
    lnglat: '128 35',
  },
  {
    id: '013',
    content: '发现新建防御工事',
    imageUrl: 'https://example.com/intel/013.jpg',
    createdAt: '2021-04-02 01:35:26',
    satelliteId: 'M13131',
    lnglat: '122 36',
  },
  {
    id: '014',
    content: '监测到通信基站建设',
    imageUrl: 'https://example.com/intel/014.jpg',
    createdAt: '2021-04-02 02:44:55',
    satelliteId: 'N14141',
    lnglat: '126 38',
  },
]

const displayData = ref<IntelData[]>([])
let currentIndex = 0
let timer: number | null = null

const updateDisplayData = () => {
  const endIndex = Math.min(currentIndex + 9, allData.length)
  displayData.value = allData.slice(currentIndex, endIndex)

  if (endIndex === allData.length) {
    currentIndex = 0
  } else {
    currentIndex++
  }
}

onMounted(() => {
  updateDisplayData()
  timer = window.setInterval(updateDisplayData, 3000) // 每3秒更新一次
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

let columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '卫星编号',
    dataIndex: 'satelliteId',
    key: 'satelliteId',
  },
  {
    title: '经纬度',
    key: 'lnglat',
    dataIndex: 'lnglat',
  },
  {
    title: '情报图片',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
  },
  {
    title: '情报内容',
    key: 'content',
    dataIndex: 'content',
  },
  {
    title: '生成时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
]
</script>

<style scoped>
.table-container {
  height: calc(100vh - 200px);
  overflow: hidden;
}

:deep(.ant-table) {
  height: 100%;
}

:deep(.ant-table-container) {
  height: 100%;
}

:deep(.ant-table-body) {
  overflow-y: auto !important;
}

:deep(.ant-table-row) {
  transition: all 0.3s ease;
}
</style>
