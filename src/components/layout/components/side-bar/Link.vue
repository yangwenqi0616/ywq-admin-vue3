<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script lang="ts">
import { isExternal } from "@/utils/common";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal(): boolean {
      return isExternal(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a";
      }
      return "router-link";
    }
  },
  methods: {
    linkProps(to: string) {
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank"
        };
      }
      return {
        to: to
      };
    }
  }
});
</script>
