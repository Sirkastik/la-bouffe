import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { auth, onAuthStateChanged } from "./includes/firebase";

let app;

onAuthStateChanged(auth, () => {
        if (!app) {
                app = createApp(App);
                app.use(store);
                app.use(router);
                app.mount("#app");
        }
});
