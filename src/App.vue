<template>
  <el-config-provider :locale="locale">
    <div id="nav">
      <router-view />
    </div>
  </el-config-provider>
</template>
<script>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  data() {
    return {
      locale: zhCn
    };
  }
});
</script>
<style lang="scss">
#nav {
  font-size: 20px;
  color: var(--mainColor);
}
</style>
