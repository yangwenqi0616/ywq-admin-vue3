<template>
  <el-container class="container-wrapper">
    <nav-bar class="nav-wrapper"/>
    <div class="main-container">
      <div class="sidebar-container">
        <sidebar/>
      </div>
      <app-main/>
    </div>
  </el-container>
</template>

<script lang="ts">
import { NavBar, Sidebar, AppMain } from "./components/helper";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
  components: {
    NavBar,
    Sidebar,
    AppMain
  },
  methods: {}
});
</script>

<style lang="scss" scoped>

.container-wrapper {
  display: flex;
  flex-direction: column;

  .nav-wrapper {
    flex: 0 0 70px;
    height: 70px;
    border-bottom: 1px solid rgba(233, 235, 241, 0.3);
  }

  .main-container {
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: row;

    .sidebar-container {
      flex: 0 0 210px;
    }
  }
}
</style>
