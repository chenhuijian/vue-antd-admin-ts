<template>
  <div class="user-layout">
    <div class="lang">
      <select-lang/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import {getRouteItem, RoutesDataItem, vueRoutes} from '@/utils/routes';
import UserLayoutRoutes from './routes';
import SelectLang from '@/components/SelectLang/index.vue';
import useTitle from '@/composables/useTitle';

const route = useRoute();
// 所有菜单路由
const menuData = ref<RoutesDataItem[]>(vueRoutes(UserLayoutRoutes, '/user'));
// 当前路由 item
const routeItem = computed<RoutesDataItem>(() => getRouteItem(route.path, menuData.value as RoutesDataItem[]));
useTitle(routeItem)
</script>

<style lang="less" scoped>
.user-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  overflow: auto;
  background-image: url('../../assets/images/bg.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  align-items: center;

  .lang {
    position: absolute;
    top: 20px;
    right: 50px;
    color: #000000;
    font-size: 16px;
  }
}
</style>
