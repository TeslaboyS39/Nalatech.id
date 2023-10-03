import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import App from './App.vue'
import router from './router'

import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
    clientId: '246465031590-6a0eoo88tgq68n85ihhh34mj9sdivldi.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')
