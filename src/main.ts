import './components/bosons/global.scss'
import Notifications from '@kyvg/vue3-notification'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Notifications)

app.mount('#app')
