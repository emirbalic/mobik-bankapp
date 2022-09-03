import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap-vue-3';

import BaseDialog from './components/ui/BaseDialog.vue';

const app = createApp(App)

app.use(bootstrap);

app.component('base-dialog', BaseDialog)

app.mount('#app')
