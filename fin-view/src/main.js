import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import Axios from './http'
const app = createApp(App)
// 给 axios 设置请求根路径
Axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
app.config.globalProperties.$axios = Axios
app.config.globalProperties.$message = ElMessage;
app.use(ElementPlus)

app.use(store).use(router).mount('#app')
