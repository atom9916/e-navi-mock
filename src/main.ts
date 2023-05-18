// import './assets/main.css'
import './firebase/firebase.ts'

import { createApp } from 'vue'
import {createHead} from '@vueuse/head'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(createPinia())

app.mount('#app')
