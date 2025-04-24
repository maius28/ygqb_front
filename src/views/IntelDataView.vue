<!-- 情报推荐的一路由组件，分为左中右布局，左为滚动的情报信息，中间为地图，右边为用户信息 -->
<template>
  <!-- 使用ant-design-vue的布局 -->
  <a-row>
    <a-col :span="24">
      <a-table :columns="columns" :data-source="data">
        <!-- <template #title>遥感情报信息列表</template> -->
      </a-table>
    </a-col>
  </a-row>

  <a-row>
    <!-- 这里左边放一个表格，用于展示情报信息，按时间顺序倒序排列，类似一个滚动的效果 -->
    <a-col :span="18">
      <MapContainer />
    </a-col>
    <a-col :span="6">
      <a-divider>机构信息</a-divider>
      <a-list item-layout="horizontal" :data-source="listData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta description="地址：北京市xxxxxxxxxxx">
              <template #title>
                {{ item.title }}
              </template>
              <template #avatar>
                <a-avatar style="background-color: #52c41a">
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
import MapContainer from '@/components/MapContainer.vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: '卫星编号',
    dataIndex: 'satelliteId',
    key: 'satelliteId',
  },
  {
    title: '位置',
    key: 'location',
    dataIndex: 'location',
  },
  {
    title: '情报图片',
    dataIndex: 'intelImage',
    key: 'intelImage',
  },
  {
    title: '情报内容',
    key: 'content',
    dataIndex: 'content',
  },
  {
    title: '生成时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
]

const data = [
  {
    satelliteId: '1',
    createTime: '2023-10-01 12:00:00',
    location: '东经104.06°，北纬30.67°',
    intelImage: 'https://example.com/image1.jpg',
    content: '情报内容1',
  },
  {
    satelliteId: '2',
    createTime: '2023-10-02 12:00:00',
    location: '东经104.06°，北纬30.67°',
    intelImage: 'https://example.com/image2.jpg',
    content: '情报内容2',
  },
  {
    satelliteId: '3',
    createTime: '2023-10-03 12:00:00',
    location: '东经104.06°，北纬30.67°',
    intelImage: 'https://example.com/image3.jpg',
    content: '情报内容3',
  },
]

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
