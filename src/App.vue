<template>
  <a-layout class="layout">
    <a-layout-header>
      <!-- 这里放一个logo和系统名称 -->
      <div class="logo"></div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <RouterLink to="/">情报推荐</RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <RouterLink to="/about">关于我们</RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 20px 50px">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>遥感情报推荐</a-breadcrumb-item>
       <a-breadcrumb-item>其他</a-breadcrumb-item>
      </a-breadcrumb> -->
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <RouterView />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">2025 @copyright 电子科技大学 </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const selectedKeys = ref<string[]>(['1'])
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
