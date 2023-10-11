import Vue from 'vue'
import App from './App'
import http from "./util/http.js";
import toast from './util/toastUtils.js'

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$toast = toast
Vue.prototype.$EventBus = new Vue()

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
