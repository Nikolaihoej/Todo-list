import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faFloppyDisk, faBan, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'

library.add(faTrash, faFloppyDisk, faBan, faPen)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')