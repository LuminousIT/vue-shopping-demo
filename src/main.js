import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "vue-loaders/dist/vue-loaders.css";
import VueLoaders from "vue-loaders";
// import VueToast from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";
import "../index.css";
import { auth } from "./util/util";

const isAuthenticated = auth();

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && to.name !== "Register" && !isAuthenticated)
    next({ name: "Login" });
  else next();
});

createApp(App)
  .use(router)
  .use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 2000,
  })
  .use(VueLoaders)
  .mount("#app");

// const myApp = createApp(App);
// myApp.use(router);
// myApp.use(Notifications);
// myApp.mount("#app");
