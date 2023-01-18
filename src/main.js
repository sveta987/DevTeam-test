import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import { createPinia } from 'pinia'
import '@/assets/taiwlind.css'

createApp(App).use(store).use(router).use(createPinia()).mount('#app')
