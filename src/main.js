import {createApp, markRaw} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";

import '@/assets/base.css'
import '@/assets/bootstrap.min.css'
import {components} from "@/components/ui";

const app = createApp(App)
const pinia = createPinia()

components.forEach(component => {
    app.component(component.name, component.element)
})

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

app
    .use(pinia)
    .use(router)
    .mount('#app')
