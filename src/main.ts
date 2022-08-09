import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mixins from "@/mixins";
import "@/styles/index.scss";
import "./permission.js";

// element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 配置element主题
import "@/styles/element/theme-config.scss";
import "@/styles/element/index.scss";

createApp(App).use(store).use(router).use(ElementPlus).mixin(Mixins).mount("#app");
