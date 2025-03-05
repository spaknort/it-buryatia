import {createApp, markRaw} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";

import '@/assets/base.css'
import '@/assets/bootstrap.min.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

app
    .use(pinia)
    .use(router)
    .mount('#app')
