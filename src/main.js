import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;

const getRuntimeConfig = async () => {
  const res = await axios.get("/config/config.json");
  const { data } = await res;

  return data;
};

getRuntimeConfig().then(json => {
  store.commit('external/setConfig', json);
  Vue.mixin({
    data() {
      return {
        config: json,
      };
    },
  });

  new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
