<template>
    <div id="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

// 声明全局类型
declare global {
    interface Window {
        _AMapSecurityConfig: {
            securityJsCode: string;
        };
    }
}

let map: any = null
let AMapInstance: any = null
let animationInterval: number | null = null

onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: '855bfc21bb81ada2603038fff5f5d93d', //密钥
    }

    //初始化加载map实例
    AMapLoader.load({
        key: 'a7246ce1dbb1a3f8e9488bb6e9d2d02d',
        version: '2.0',
        plugins: ['AMap.Scale', 'Loca'],
        Loca: {
            version: '2.0.0',
        },
    })
        .then((AMap) => {
            AMapInstance = AMap
            map = new AMap.Map('container', {
                zoom: 5.0,
                center: [109.595668, 35.447184],
                showLabel: true, //是否显示标签
                viewMode: '3D',
                mapStyle: 'amap://styles/dark', // 暗色风格
            })

            //使用卫生图层
            // const satelliteLayer = new AMap.TileLayer.Satellite() //卫星图层
            // map.add(satelliteLayer)

            let loca = new Loca.Container({
                map,
            })

            //添加marker标记点
            //创建一个 Marker 实例：
            const marker = new AMap.Marker({
                position: new AMap.LngLat(116.397428, 39.90923),
                // icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                title: "滑过的文字", //鼠标滑过时显示的文字，不设置时不显示,
                label: {
                    content: "显示的文字",
                }
            })
            //将创建的点标记添加到已有的地图实例：
            map.add(marker)

            //创建点标记的点击事件
            marker.on("click", (e: any) => {
                alert("你点击了Marker")
            })

            //圆形标记
            //设置圆形位置
            const center = new AMap.LngLat(119.79, 24.55)
            //设置圆的半径大小
            const radius = 2 //单位:px

            //创建圆形点标记 CircleMarker 实例
            const circleMarker = new AMap.CircleMarker({
                center: center, //圆心
                radius: radius, //半径
                strokeColor: "red", //轮廓线颜色
                strokeWeight: 1, //轮廓线宽度
                strokeOpacity: 0.8, //轮廓线透明度
                fillColor: "rgba(255,0,0,0.5)", //圆点填充颜色
                fillOpacity: 0.5, //圆点填充透明度
                zIndex: 10, //圆点覆盖物的叠加顺序
                cursor: "pointer", //鼠标悬停时的鼠标样式
            })

            //圆形 circleMarker 对象添加到 Map
            map.add(circleMarker)

            // 添加扩散动画
            let currentRadius = radius
            const maxRadius = 10
            animationInterval = window.setInterval(() => {
                currentRadius += 1
                if (currentRadius > maxRadius) {
                    currentRadius = radius
                }
                circleMarker.setRadius(currentRadius)
            }, 120)

            //添加链接线
            let path = [
                new AMap.LngLat(119.79, 24.55),
                new AMap.LngLat(116.397428, 39.90923),
            ]

            //创建脉冲线
            const pulseLink = new Loca.PulseLinkLayer({
                zIndex: 10,
                opacity: 1,
                visible: true,
                zooms: [2, 22],
                depth: true
            })

            pulseLink.setSource(
                new Loca.GeoJSONSource({
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: [
                                    [119.79, 24.55],
                                    [116.397428, 39.90923]
                                ]
                            }
                        }]
                    }
                })
            )

            pulseLink.setStyle({
                unit: 'meter',
                dash: [40000, 0, 40000, 0],
                lineWidth: function (index: number, feat: any) {
                    return [20000, 1000]
                },
                height: function (index: number, feat: any) {
                    return feat.distance / 3 + 10
                },
                smoothSteps: 30,
                speed: function (index: number, prop: any) {
                    return 1000 + Math.random() * 200000
                },
                flowLength: 100000,
                lineColors: function (index: number, feat: any) {
                    return ['rgb(255,228,105)', 'rgb(255,164,105)', 'rgba(1, 34, 249,1)']
                },
                maxHeightScale: 0.3,
                headColor: 'rgba(255, 255, 0, 1)',
                trailColor: 'rgba(255, 255,0,0)'
            })

            loca.add(pulseLink)
            pulseLink.hide()

            //事件,点击情报点，显示链接线
            circleMarker.on('click', (event: any) => {
                console.log(pulseLink)
                if (pulseLink.visible) {
                    pulseLink.hide()
                } else {
                    pulseLink.show()
                }
            })

            loca.add(pulseLink)

            loca.animate.start()
        })
        .catch((e) => {
            console.log(e)
        })
})

onUnmounted(() => {
    if (animationInterval) {
        clearInterval(animationInterval)
    }
    map?.destroy()
})
</script>

<style scoped>
#container {
    width: 100%;
    height: calc(100vh - 200px);
}
</style>