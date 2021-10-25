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
  render() {
    const {icon, title} = this;
    return h("div", null, [
      h("i", {
        class: icon
      }),
      h("span", null, title)
    ]);
  }
});
</script>
