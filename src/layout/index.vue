<template>
  <el-container class="app-container">
    <div class="sidebar-container">
      <section class="logo text-ellipsis" :class="{ hidden: isCollapse }">
        <img src="@/assets/logo1.png" alt="" />
        <span>YWQ的系统</span>
      </section>
      <sidebar />
    </div>
    <div class="main-container">
      <nav-bar class="nav-wrapper" />
      <tags-view class="tags-wrapper" />
      <app-main class="main-wrapper" />
    </div>
  </el-container>
</template>

<script lang="ts">
import { NavBar, Sidebar, AppMain, TagsView } from './components/helper';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'Layout',
  components: {
    NavBar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    isCollapse() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return store.state.loginStore.isCollapse;
    }
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
    flex: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 64px;
    background: #304156;

    .logo {
      display: flex;
      align-items: center;
      padding-left: 25px;
      height: 64px;
      flex: auto;
      font-weight: 600;
      font-size: 18px;
      color: #fff;
      position: absolute;
      top: 0px;

      &.hidden {
        padding-left: 0;
        left: 25px;
        width: 20px;
      }

      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
  }

  .main-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: #eee;

    .nav-wrapper,
    .tags-wrapper {
      flex: 0 0 40px;
      border-bottom: 1px solid rgba(233, 235, 241, 0.3);
    }

    .nav-wrapper {
      flex: 0 0 60px;
    }

    .main-wrapper {
      height: 100%;
    }
  }
}
</style>
