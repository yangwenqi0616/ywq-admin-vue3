<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore, mapState } from "vuex";

export default defineComponent({
  name: "AppMain",
  computed: {
    ...mapState("tagsView", {
      cachedViews: "cachedViews"
    }),
    key() {
      return this.$route.path;
    }
  },
  mounted() {
    console.log(this.cachedViews, 34);
  }
});
</script>
<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

