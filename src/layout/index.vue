<template>
  <el-container class="app-container">
    <div class="sidebar-container">
      <sidebar/>
    </div>
    <div class="main-container">
      <nav-bar class="nav-wrapper"/>
      <tags-view class="tags-wrapper"/>
      <app-main class="main-wrapper"/>
    </div>
  </el-container>
</template>

<script lang="ts">
import { NavBar, Sidebar, AppMain, TagsView } from "./components/helper";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  components: {
    NavBar,
    Sidebar,
    AppMain,
    TagsView
  },
  methods: {}
});
</script>

<style lang="scss" scoped>

.app-container {
  display: flex;
  width: 100%;
  height: 100vh;

  .sidebar-container {
    flex: 0 0 210px;
  }

  .main-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .nav-wrapper, .tags-wrapper {
      flex: 0 0 40px;
      border-bottom: 1px solid rgba(233, 235, 241, 0.3);
    }

    .main-wrapper {
      height: 100%;
    }
  }
}
</style>
