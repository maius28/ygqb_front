<script lang="js" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

let map = null
let AMap = null
const selectedPoint = ref(null)

// 模拟数据
const intelligencePoints = [
  { position: [120.2, 30.3], name: '情报点1' },
  { position: [122.1, 29.8], name: '情报点2' },
  { position: [121.5, 31.2], name: '情报点3' },
]

const agencyPoints = [
  {
    position: [116.4, 39.9],
    name: '北京总部',
    address: '北京市海淀区中关村',
    phone: '010-12345678',
  },
  {
    position: [121.4, 31.2],
    name: '上海分部',
    address: '上海市浦东新区陆家嘴',
    phone: '021-87654321',
  },
  {
    position: [113.2, 23.1],
    name: '广州分部',
    address: '广州市天河区珠江新城',
    phone: '020-11223344',
  },
]

// 创建情报点标记
const createIntelligenceMarker = (point) => {
  return new AMap.Marker({
    position: point.position,
    content: `<div style="
      width: 12px;
      height: 12px;
      background: #1890ff;
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    "></div>`,
    offset: new AMap.Pixel(-6, -6),
    title: point.name,
  })
}

// 创建机构点标记
const createAgencyMarker = (point) => {
  const marker = new AMap.Marker({
    position: point.position,
    content: `<div style="
      width: 24px;
      height: 24px;
      background: #52c41a;
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="environment" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="color: white; font-size: 14px;">
        <path d="M512 327c-29.9 0-58 11.6-79.2 32.8A111.6 111.6 0 00400 439c0 29.9 11.7 58 32.8 79.2A111.6 111.6 0 00512 551c29.9 0 58-11.7 79.2-32.8C612.4 497 624 468.9 624 439c0-29.9-11.6-58-32.8-79.2A111.6 111.6 0 00512 327zm342.6.6L512 32 169.4 327.6a56.08 56.08 0 00-13.6 71.8l212.7 350.2c12.3 20.3 37.2 30.3 58.9 24.3 1.4-.4 2.8-1 4.2-1.7l.2-.1c21.3-10 33.8-32.3 33.8-56.4V576h96v184.9c0 23.9 12.1 45.9 33.3 55.9l.1.1c1.5.7 3 1.3 4.5 1.7 21.7 6 46.6-4 58.9-24.3l212.7-350.2c6.2-10.2 8.4-22.3 6.2-34-2.2-11.7-8.9-22.1-18.7-29.1zM512 615c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path>
      </svg>
    </div>`,
    offset: new AMap.Pixel(-12, -12),
  })

  // 创建文本框
  const label = new AMap.Text({
    position: point.position,
    text: point.name,
    style: {
      padding: '2px 6px',
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid #52c41a',
      'border-radius': '4px',
      color: '#52c41a',
      'font-size': '12px',
      'white-space': 'nowrap',
    },
    offset: new AMap.Pixel(15, 0),
  })

  // 创建信息窗体
  const infoWindow = new AMap.InfoWindow({
    content: `
      <div style="padding: 10px;">
        <h3 style="margin: 0 0 10px 0; color: #52c41a;">${point.name}</h3>
        <p style="margin: 5px 0;"><strong>地址：</strong>${point.address}</p>
        <p style="margin: 5px 0;"><strong>电话：</strong>${point.phone}</p>
      </div>
    `,
    offset: new AMap.Pixel(0, -30),
  })

  // 鼠标悬停事件
  marker.on('mouseover', () => {
    infoWindow.open(map, point.position)
  })
  marker.on('mouseout', () => {
    infoWindow.close()
  })

  return { marker, label }
}

// 创建连线
const createConnectionLines = (intelligencePoint) => {
  const lines = agencyPoints.map((agency) => {
    // 创建主线条
    const mainLine = new AMap.Polyline({
      path: [intelligencePoint.position, agency.position],
      strokeColor: '#1890ff',
      strokeWeight: 2,
      strokeStyle: 'dashed',
      strokeOpacity: 0.8,
    })

    // 创建动画线条
    const animateLine = new AMap.Polyline({
      path: [intelligencePoint.position, agency.position],
      strokeColor: '#1890ff',
      strokeWeight: 3,
      strokeOpacity: 0.8,
      showDir: true, // 显示方向箭头
    })

    // 添加动画效果
    let passedPath = []
    const animate = () => {
      const path = animateLine.getPath()
      if (passedPath.length < path.length) {
        passedPath.push(path[passedPath.length])
        animateLine.setPath(passedPath)
        requestAnimationFrame(animate)
      } else {
        passedPath = []
        setTimeout(() => {
          animate()
        }, 1000) // 动画完成后等待1秒重新开始
      }
    }
    animate()

    return { mainLine, animateLine }
  })
  return lines
}

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '855bfc21bb81ada2603038fff5f5d93d',
  }
  AMapLoader.load({
    key: 'a7246ce1dbb1a3f8e9488bb6e9d2d02d',
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.DistrictLayer'],
  })
    .then((AMapInstance) => {
      AMap = AMapInstance
      map = new AMap.Map('container', {
        center: [105.0, 35.0],
        zoom: 4.5,
        viewMode: '2D',
        zooms: [3, 18],
        limitBounds: new AMap.Bounds([73.499734, 18.159013], [135.085831, 53.560815]),
        mapStyle: 'amap://styles/dark',
      })

      // 添加控件
      map.addControl(new AMap.Scale())
      map.addControl(new AMap.ToolBar())

      // 添加行政区划图层
      const districtLayer = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [100000],
        depth: 2,
        styles: {
          fill: function (properties) {
            return 'rgba(0,0,0,0)'
          },
          'province-stroke': '#47747C',
          'city-stroke': '#47747C',
          'county-stroke': '#47747C',
        },
      })
      map.add(districtLayer)

      // 添加情报点
      intelligencePoints.forEach((point) => {
        const marker = createIntelligenceMarker(point)
        marker.on('click', () => {
          // 清除之前的连线
          map.getAllOverlays('polyline').forEach((line) => map.remove(line))

          // 创建新的连线
          const lines = createConnectionLines(point)
          lines.forEach(({ mainLine, animateLine }) => {
            map.add(mainLine)
            map.add(animateLine)
          })

          selectedPoint.value = point
        })
        map.add(marker)
      })

      // 添加机构点
      agencyPoints.forEach((point) => {
        const { marker, label } = createAgencyMarker(point)
        map.add(marker)
        map.add(label)
      })
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
  height: 800px;
}
</style>
