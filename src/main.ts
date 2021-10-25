import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";
import "./permission.js";
import Mixins from "@/mixins";

createApp(App).use(store).use(router).use(ElementPlus).mixin(Mixins).mount("#app");
