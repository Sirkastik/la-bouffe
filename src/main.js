import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toaster from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

createApp(App)
	.use(store)
	.use(router)
	.use(Toaster)
	.mount("#app");
