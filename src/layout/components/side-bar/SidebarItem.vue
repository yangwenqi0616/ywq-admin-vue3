<template>
  <div v-if="!item.meta.hidden">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.meta.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild?.meta.icon||item?.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import path from "path";
import { isExternal } from "@/utils/common";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    let itemModel: RouteRecordRaw | any = {
      path: "",
      name: "",
      children: [],
      meta: {},
      component: {}
    };
    return {
      onlyOneChild: itemModel
    };
  },
  methods: {
    /**
     * 用于判断是否只有一个可显示的子节点
     * @param {RouteRecordRaw[]} children - 子路由
     * @param {RouteRecordRaw} parent - 父路由
     * @return {boolean}
     */
    hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
      // 可显示的子路由菜单
      const showingChildren = children.filter((item: RouteRecordRaw) => {
        if (item?.meta?.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      } else if (showingChildren.length === 0) {
        // 此时basePath已经拼接为最后的路由,故把path清空
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      } else {
        return false;
      }
    },
    resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
});
</script>

<style lang="scss">
.el-sub-menu [class^=el-icon-] {
  vertical-align: middle !important;
}
</style>
