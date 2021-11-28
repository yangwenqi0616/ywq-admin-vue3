<template>
  <iframe v-if="isExternalUrl" class="my-iframe" name="myIframe" :src="iframeUrl">
    抱歉,您的浏览器暂不支持iframe
  </iframe>
  <div v-else>
    当前页面未成功配置
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { isExternal } from "@/utils/common";
import { computed } from "vue";

const route = useRoute();
const iframeUrl = route?.meta?.url as string || "";
const isExternalUrl = computed(() => isExternal(iframeUrl));
</script>
<style lang="scss" scoped>
.my-iframe {
  width: 100%;
  height: 100%;
}
</style>

