<template>
  <div class="slider-bar">
    <el-scrollbar class="slider-bar-scrollbar">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="false"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical">
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/variables.scss";
import { constantRoutes } from "@/router";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();

const routerList = computed(() => {
  return store.state.loginStore.routerList;
});
const routes = computed(() => {
  return [...constantRoutes, ...routerList.value];
});
const isCollapse = computed(() => {
  return store.state.loginStore.isCollapse;
});
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style lang="scss" scoped>
.slider-bar {
  height: 100%;

  ::v-deep {
    .el-menu {
      border: none;
    }

    .el-menu:not(.el-menu--collapse) {
      width: 200px;
    }

    .el-menu.el-menu--collapse {
      .el-sub-menu__title span,
      .el-menu-item span,
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  &-scrollbar {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    ::v-deep .el-scrollbar__view, .el-menu {
      height: 100%;
    }
  }
}
</style>
