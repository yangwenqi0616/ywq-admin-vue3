<template>
  <i class="el-icon-setting"></i>
  <span>{{ title }}</span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { h } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  created() {
    // console.log("icon", this.icon);
  }
  // render() {
  //   // const {icon, title} = context.props;
  //   const vnodes = [];
  //   if (this.icon) {
  //     if (this.icon.includes("el-icon")) {
  //       console.log(1);
  //       vnodes.push("<i class={[icon, 'sub-el-icon']} />");
  //     } else {
  //       console.log(2);
  //       vnodes.push("<el-icon><edit /></el-icon>");
  //     }
  //   }
  //   if (this.title) {
  //     vnodes.push("<template #title><span>{(title)}</span></template>");
  //   }
  //   return h(vnodes);
  // }
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
  margin-right: 16px;
  font-size: 14px;
  transform: scale(1.2);
}
</style>
