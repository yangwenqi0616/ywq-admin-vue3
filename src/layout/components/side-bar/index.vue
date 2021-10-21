<template>
  <div class="slider-bar">
    <el-scrollbar class="slider-bar-scrollbar">
      <el-menu
          :default-active="activeMenu"
          :unique-opened="false"
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

<script lang="ts">
import SidebarItem from "./SidebarItem.vue";
import { constantRoutes } from "@/router";
import { mapState } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  components: {SidebarItem},
  computed: {
    ...mapState("loginStore", {
      routerList: "routerList"
    }),
    routes() {
      return [...constantRoutes, ...this.routerList];
    },
    activeMenu() {
      const route = this.$route;
      const {meta, path} = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.slider-bar {
  height: 100%;

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
