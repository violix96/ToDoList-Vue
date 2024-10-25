import { createApp } from 'vue';
import './style.scss'; // Assicurati che il file SCSS sia qui

import App from './App.vue';



// Bootstrap
import * as bootstrap from 'bootstrap';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const app = createApp(App);

app.mount('#app');
