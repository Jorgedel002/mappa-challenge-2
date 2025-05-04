import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faApple, faGoogle, faFacebookF, faEnvelope, faChevronLeft, faEye, faEyeSlash)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
