<template>
  <div class="refresh" v-loading="true"></div>
</template>

<script>
export default {
  name: 'refresh',
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace({
        path: from.path, query: from.query
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.refresh {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
