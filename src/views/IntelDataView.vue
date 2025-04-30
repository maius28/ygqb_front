<!-- 情报推荐的一路由组件，分为左中右布局，左为滚动的情报信息，中间为地图，右边为用户信息 -->
<template>
  <a-row>
    <!-- 这里左边放一个表格，用于展示情报信息，按时间顺序倒序排列，类似一个滚动的效果 -->
    <a-col :span="6">
      <IntelDataTable />
    </a-col>
    <a-col :span="14">
      <DefaultMapContainer />
    </a-col>
    <a-col :span="4">
      <a-divider>机构信息</a-divider>
      <a-list item-layout="horizontal" :data-source="listData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta description="地址：北京市xxxxxxxxxxx">
              <template #title>
                {{ item.title }}
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon><EnvironmentOutlined /></template>
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="IntelDataView">
// import MapContainer from '@/components/MapContainer.vue'
import DefaultMapContainer from '@/components/DefaultMapContainer.vue'
import IntelDataTable from '@/components/IntelDataTable.vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'

interface DataItem {
  title: string
}
const listData: DataItem[] = [
  {
    title: '北部战区xxx分队',
  },
  {
    title: '东部战区xxx分队',
  },
  {
    title: '西部战区xxx分队',
  },
  {
    title: '南部站区xxx分队',
  },
]
</script>

<style scoped></style>
