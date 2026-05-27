<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" v-if="!$route?.meta?.isIframe">
      <keep-alive :include="cachedViews">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" :key="key" />
        </transition>
      </keep-alive>
    </router-view>
    <Iframe
      v-if="cachedViews.includes('myBlog')"
      v-show="$route?.meta?.isIframe"
    />
  </section>
</template>
<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Iframe from '@/views/Iframe.vue';

export default {
  name: 'AppMain',
  components: {
    Iframe
  },
  computed: {
    ...mapState('tagsView', {
      cachedViews: 'cachedViews'
    }),
    key() {
      const key = this.$route.fullPath;
      return key;
    }
  },
  mounted() {
    console.log(this.cachedViews);
  }
};
</script>
<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
