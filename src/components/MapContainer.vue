<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

let map = null
let AMap = null
const selectedPoint = ref(null)

// 机构mock信息
let mockAgentData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        cityName: '韶关市',
        ratio: 0,
        rank: 96,
      },
      geometry: {
        type: 'Point',
        coordinates: [113.58052, 24.760098],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '乐山市',
        ratio: 0,
        rank: 97,
      },
      geometry: {
        type: 'Point',
        coordinates: [103.75082, 29.58099],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '阜阳市',
        ratio: 0,
        rank: 98,
      },
      geometry: {
        type: 'Point',
        coordinates: [115.82654, 32.889915],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '荆门市',
        ratio: 0,
        rank: 99,
      },
      geometry: {
        type: 'Point',
        coordinates: [112.209816, 30.997377],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '哈尔滨市',
        ratio: 0,
        rank: 100,
      },
      geometry: {
        type: 'Point',
        coordinates: [126.61314, 45.746685],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '达州市',
        ratio: 0,
        rank: 101,
      },
      geometry: {
        type: 'Point',
        coordinates: [107.493, 31.205515],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '自贡市',
        ratio: 0,
        rank: 102,
      },
      geometry: {
        type: 'Point',
        coordinates: [104.777824, 29.34555],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '陇南市',
        ratio: 0,
        rank: 103,
      },
      geometry: {
        type: 'Point',
        coordinates: [104.93356, 33.388184],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '南充市',
        ratio: 0,
        rank: 104,
      },
      geometry: {
        type: 'Point',
        coordinates: [106.1188, 30.800997],
      },
    },
    {
      type: 'Feature',
      properties: {
        cityName: '恩施土家族苗族自治州',
        ratio: 0,
        rank: 105,
      },
      geometry: {
        type: 'Point',
        coordinates: [109.48512, 30.298103],
      },
    },
  ],
}

//情报mock信息
let mockIntelData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: '情报点1',
        ratio: 0,
      },
      geometry: {
        type: 'Point',
        coordinates: [119.79, 24.55],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '情报点2',
        ratio: 0,
      },
      geometry: {
        type: 'Point',
        coordinates: [117.51, 15.07],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '情报点3',
        ratio: 0,
      },
      geometry: {
        type: 'Point',
        coordinates: [121.5, 25.25],
      },
    },
  ],
}

//首次加载时，初始化地图
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '855bfc21bb81ada2603038fff5f5d93d', //密钥
  }
  AMapLoader.load({
    key: 'a7246ce1dbb1a3f8e9488bb6e9d2d02d',
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.DistrictLayer', 'Loca'],
    Loca: {
      version: '2.0.0',
    },
  })
    .then((AMapInstance) => {
      AMap = AMapInstance
      map = new AMap.Map('container', {
        zoom: 4.3,
        center: [109.595668, 35.447184],
        showLabel: false,
        viewMode: '3D',
        mapStyle: 'amap://styles/dark',
      })

      let loca = new Loca.Container({
        map,
      })

      //机构点层
      let agentLayer = new Loca.ScatterLayer({
        // loca,
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22],
      })

      agentLayer.setSource(
        new Loca.GeoJSONSource({
          data: mockAgentData,
        }),
        {
          unit: 'px',
          size: [20, 20],
          texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/blue.png',
          borderWidth: 0,
        },
      )

      // 情报呼吸点层，显示情报地点
      let intelDataLayer = new Loca.ScatterLayer({
        zIndex: 121,
      })

      intelDataLayer.setSource(
        new Loca.GeoJSONSource({
          data: mockIntelData,
        }),
      )

      intelDataLayer.setStyle({
        unit: 'px',
        size: [30, 30],
        texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
        animate: true,
        duration: 1000,
      })

      loca.add(agentLayer)
      loca.add(intelDataLayer)

      loca.animate.start()
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: calc(100vh - 200px);
}
</style>
