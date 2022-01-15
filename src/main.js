import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { auth, onAuthStateChanged } from "@/includes/firebase.js";

let app;

onAuthStateChanged(auth, (user) => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(router)
			.use(VueToast)
			.mount("#app");
	}

	if (user) {
		store.dispatch("setUser", user);
	}
});
